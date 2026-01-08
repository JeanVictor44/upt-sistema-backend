import type { StudentWithDetailsDTO } from '@root/domain/academic/applications/dtos/student-with-details.dto'

import { ListStudentsResponseSwaggerDto } from '../swagger/academic/docs/student/list-student-swagger.dto'

export class StudentViewModel {
  static toHttp(student: StudentWithDetailsDTO): ListStudentsResponseSwaggerDto['results'][0] {
    return {
      id: student.id,
      name: student.name,
      socialName: student.socialName ?? null,
      cpf: student.cpf,
      rg: student.rg ?? null,
      email: student.email ?? null,
      telephone: student.telephone ?? null,
      dateBirth: student.dateBirth ?? null,
      address: student.address
        ? {
            id: student.address.id,
            street: student.address.street ?? null,
            number: student.address.number ?? null,
            neighborhood: student.address.neighborhood ?? null,
            city: student.address.city ?? null,
            zipCode: student.address.zipCode ?? null,
            traditionalCommunityName: student.address.traditionalCommunityName ?? null,
            propertyLocationCategory: student.address.propertyLocationCategory
              ? {
                  id: student.address.propertyLocationCategory.id,
                  name: student.address.propertyLocationCategory.name,
                  createdAt: student.address.propertyLocationCategory.createdAt,
                  updatedAt: student.address.propertyLocationCategory.updatedAt,
                }
              : null,
          }
        : null,
      classEnrollments: student.classEnrollments.map((enrollment) => ({
        id: enrollment.id,
        isExempt: enrollment.isExempt,
        enrollmentDate: enrollment.enrollmentDate,
        statusId: enrollment.statusId,
        classEdition: {
          id: enrollment.classEdition.id,
          enrolledCount: enrollment.classEdition.enrolledCount,
          edition: {
            id: enrollment.classEdition.edition.id,
            year: enrollment.classEdition.edition.year,
          },
          teachingPlace: {
            name: enrollment.classEdition.teachingPlace.name,
          },
          option: {
            name: enrollment.classEdition.option.name,
          },
          createdAt: enrollment.classEdition.createdAt,
          updatedAt: enrollment.classEdition.updatedAt,
        },
      })),
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
    }
  }
}
