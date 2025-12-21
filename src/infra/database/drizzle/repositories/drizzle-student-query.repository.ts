import { Inject, Injectable } from '@nestjs/common'
import { StudentWithDetailsDTO } from '@root/domain/academic/applications/dtos/student-with-details.dto'
import {
  FindAllStudentsWithDetailsParams,
  StudentQueryRepository,
} from '@root/domain/academic/applications/repositories/student-query-repository'
import { eq, count, or, not, exists, SQL, and, desc } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import {
  addressSchema,
  classEditionSchema,
  editionSchema,
  enrollmentSchema,
  ethnicitySchema,
  genderIdentitySchema,
  highSchoolStatusSchema,
  neighborhoodSchema,
  propertyLocationCategorySchema,
  studentSchema,
  teachingPlaceSchema,
} from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleStudentQueryRepository implements StudentQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findAllWithDetails({
    classEditionId,
    regionId,
  }: FindAllStudentsWithDetailsParams): Promise<StudentWithDetailsDTO[]> {
    // Busca a última edição cadastrada (maior ano)
    const [lastEdition] = await this.db
      .select({ id: editionSchema.id })
      .from(editionSchema)
      .orderBy(desc(editionSchema.year))
      .limit(1)

    // Monta a query base
    let query = this.db
      .selectDistinct({
        id: studentSchema.id,
        name: studentSchema.name,
        socialName: studentSchema.socialName,
        cpf: studentSchema.cpf,
        rg: studentSchema.rg,
        dateBirth: studentSchema.dateBirth,
        telephone: studentSchema.telephone,
        email: studentSchema.email,
        address: {
          id: addressSchema.id,
          street: addressSchema.street,
          number: addressSchema.number,
          neighborhood: addressSchema.neighboorhood,
          city: addressSchema.city,
          zipCode: addressSchema.zipCode,
          propertyLocationCategoryId: addressSchema.propertyLocationCategoryId,
          propertyLocationCategoryName: propertyLocationCategorySchema.name,
          traditionalCommunityName: addressSchema.traditionalCommunityName,
          propertyLocationCategoryCreatedAt: propertyLocationCategorySchema.createdAt,
          propertyLocationCategoryUpdatedAt: propertyLocationCategorySchema.updatedAt,
        },
        genderIdentity: {
          id: genderIdentitySchema.id,
          name: genderIdentitySchema.name,
        },
        ethnicity: {
          id: ethnicitySchema.id,
          name: ethnicitySchema.name,
        },
        highSchoolStatus: {
          id: highSchoolStatusSchema.id,
          name: highSchoolStatusSchema.name,
        },
        createdAt: studentSchema.createdAt,
        updatedAt: studentSchema.updatedAt,
      })
      .from(studentSchema)
      .innerJoin(genderIdentitySchema, eq(genderIdentitySchema.id, studentSchema.genderIdentityId))
      .innerJoin(ethnicitySchema, eq(ethnicitySchema.id, studentSchema.ethnicityId))
      .innerJoin(highSchoolStatusSchema, eq(highSchoolStatusSchema.id, studentSchema.highSchoolStatusId))
      .leftJoin(addressSchema, eq(addressSchema.id, studentSchema.addressId))
      .leftJoin(
        propertyLocationCategorySchema,
        eq(propertyLocationCategorySchema.id, addressSchema.propertyLocationCategoryId),
      )
      .leftJoin(enrollmentSchema, eq(enrollmentSchema.studentId, studentSchema.id))

    if (regionId || classEditionId || lastEdition) {
      query = query
        .leftJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
        .leftJoin(editionSchema, eq(editionSchema.id, classEditionSchema.editionId))
    }

    if (regionId) {
      query = query
        .leftJoin(teachingPlaceSchema, eq(teachingPlaceSchema.id, classEditionSchema.teachingPlaceId))
        .leftJoin(neighborhoodSchema, eq(neighborhoodSchema.id, teachingPlaceSchema.neighborhoodId))
    }

    // Monta a cláusula where
    const whereConditions: SQL<unknown>[] = []

    // Se não há filtros, é um usuário ADMIN - retorna todos os estudantes
    const isAdmin = !classEditionId && !regionId

    if (isAdmin) {
      // Admin vê todos os estudantes sem restrição
      // Não adiciona nenhuma condição de filtro
    } else {
      // Para usuários com filtros, aplica as regras de negócio

      // Sempre inclui estudantes sem nenhuma matrícula
      whereConditions.push(
        not(exists(this.db.select().from(enrollmentSchema).where(eq(enrollmentSchema.studentId, studentSchema.id)))),
      )

      // Sempre inclui estudantes que não possuem matrícula na última edição
      if (lastEdition) {
        whereConditions.push(
          not(
            exists(
              this.db
                .select()
                .from(enrollmentSchema)
                .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
                .where(
                  and(
                    eq(enrollmentSchema.studentId, studentSchema.id),
                    eq(classEditionSchema.editionId, lastEdition.id),
                  ),
                ),
            ),
          ),
        )
      }

      // Adiciona filtro por classEditionId se fornecido
      if (classEditionId) {
        whereConditions.push(eq(enrollmentSchema.classEditionId, classEditionId))
      }

      // Adiciona filtro por regionId se fornecido
      if (regionId) {
        whereConditions.push(eq(neighborhoodSchema.regionId, regionId))
      }
    }

    const students = whereConditions.length > 0 ? await query.where(or(...whereConditions)) : await query

    const studentsWithEnrollments = await Promise.all(
      students.map(async (student) => {
        const enrollments = await this.db
          .select({
            id: enrollmentSchema.id,
            isExempt: enrollmentSchema.isExempt,
            enrollmentDate: enrollmentSchema.enrollmentDate,
            statusId: enrollmentSchema.statusId,
            classEdition: {
              id: classEditionSchema.id,

              editionId: editionSchema.id,
              editionYear: editionSchema.year,
              createdAt: classEditionSchema.createdAt,
              updatedAt: classEditionSchema.updatedAt,
            },
          })
          .from(enrollmentSchema)
          .innerJoin(classEditionSchema, eq(classEditionSchema.id, enrollmentSchema.classEditionId))
          .innerJoin(editionSchema, eq(editionSchema.id, classEditionSchema.editionId))
          .where(eq(enrollmentSchema.studentId, student.id))

        // Buscar a contagem de estudantes matriculados em cada classEdition
        const enrollmentsWithCount = await Promise.all(
          enrollments.map(async (enrollment) => {
            const [countResult] = await this.db
              .select({ count: count() })
              .from(enrollmentSchema)
              .where(eq(enrollmentSchema.classEditionId, enrollment.classEdition.id))

            return {
              id: enrollment.id,
              isExempt: enrollment.isExempt,
              enrollmentDate: enrollment.enrollmentDate,
              statusId: enrollment.statusId,
              classEdition: {
                id: enrollment.classEdition.id,
                enrolledCount: countResult.count,
                edition: {
                  id: enrollment.classEdition.editionId,
                  year: enrollment.classEdition.editionYear,
                },
                createdAt: enrollment.classEdition.createdAt,
                updatedAt: enrollment.classEdition.updatedAt,
              },
            }
          }),
        )

        return {
          ...student,
          classEnrollments: enrollmentsWithCount,
        }
      }),
    )

    return studentsWithEnrollments.map((student) => ({
      id: student.id,
      name: student.name,
      socialName: student.socialName,
      cpf: student.cpf,
      rg: student.rg,
      dateBirth: student.dateBirth,
      telephone: student.telephone,
      email: student.email,
      classEnrollments: student.classEnrollments,
      address: student.address?.id
        ? {
            id: student.address.id,
            street: student.address.street ?? undefined,
            number: student.address.number ?? undefined,
            neighborhood: student.address.neighborhood ?? undefined,
            city: student.address.city ?? undefined,
            zipCode: student.address.zipCode ?? undefined,
            traditionalCommunityName: student.address.traditionalCommunityName ?? undefined,
            propertyLocationCategory:
              student.address.propertyLocationCategoryId &&
              student.address.propertyLocationCategoryName &&
              student.address.propertyLocationCategoryCreatedAt &&
              student.address.propertyLocationCategoryUpdatedAt
                ? {
                    id: student.address.propertyLocationCategoryId,
                    name: student.address.propertyLocationCategoryName,
                    createdAt: student.address.propertyLocationCategoryCreatedAt,
                    updatedAt: student.address.propertyLocationCategoryUpdatedAt,
                  }
                : undefined,
          }
        : undefined,
      genderIdentity: {
        id: student.genderIdentity.id,
        name: student.genderIdentity.name,
      },
      ethnicity: {
        id: student.ethnicity.id,
        name: student.ethnicity.name,
      },
      highSchoolStatus: {
        id: student.highSchoolStatus.id,
        name: student.highSchoolStatus.name,
      },
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }))
  }
}
