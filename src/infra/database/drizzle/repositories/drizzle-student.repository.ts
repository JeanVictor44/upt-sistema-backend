import { Inject, Injectable } from '@nestjs/common'
import { AsyncMaybe } from '@root/core/logic/Maybe'
import { StudentRepository } from '@root/domain/academic/applications/repositories/student-repository'
import { Student } from '@root/domain/academic/enterprise/entities/student'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { StudentMappers } from '../mappers/student.mappers'
import { studentSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleStudentRepository implements StudentRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(student: Student): Promise<{ id: number }> {
    const preparedData = StudentMappers.toPersistence(student)

    const studentCreated = (
      await this.db.insert(studentSchema).values(preparedData).returning({ id: studentSchema.id })
    )[0]

    return studentCreated
  }

  async save(student: Student): Promise<void> {
    const preparedData = StudentMappers.toPersistence(student)

    await this.db.update(studentSchema).set(preparedData).where(eq(studentSchema.id, student.id))
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(studentSchema).where(eq(studentSchema.id, id))
  }

  async findById(id: number): AsyncMaybe<Student> {
    const student = await this.db.query.studentSchema.findFirst({
      where: eq(studentSchema.id, id),
    })

    if (!student) return null

    return StudentMappers.toDomain(student)
  }

  async findByCpf(cpf: string): AsyncMaybe<Student> {
    const student = await this.db.query.studentSchema.findFirst({
      where: eq(studentSchema.cpf, cpf),
    })

    if (!student) return null
    return StudentMappers.toDomain(student)
  }

  async findByRg(rg: string): AsyncMaybe<Student> {
    const student = await this.db.query.studentSchema.findFirst({
      where: eq(studentSchema.rg, rg),
    })

    if (!student) return null
    return StudentMappers.toDomain(student)
  }

  async findByEmail(email: string): AsyncMaybe<Student> {
    const student = await this.db.query.studentSchema.findFirst({
      where: eq(studentSchema.email, email),
    })
    if (!student) return null
    return StudentMappers.toDomain(student)
  }
}
