import { AsyncMaybe } from '@root/core/logic/Maybe'

import { Student } from '../../enterprise/entities/student'

export abstract class StudentRepository {
  abstract create(student: Student): Promise<{ id: number }>
  abstract findById(id: number): AsyncMaybe<Student>
  abstract findByCpf(cpf: string): AsyncMaybe<Student>
  abstract findByRg(rg: string): AsyncMaybe<Student>
  abstract findByEmail(email: string): AsyncMaybe<Student>
  abstract save(edition: Student): Promise<void>
  abstract delete(id: number): Promise<void>
}
