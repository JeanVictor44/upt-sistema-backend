import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { Student } from '@root/domain/academic/enterprise/entities/student'

import { Either, left, right } from '@core/logic/Either'

import { StudentRepository } from '../../repositories/student-repository'

type InputProps = {
  name: string
  socialName?: string
  cpf: string
  rg?: string
  dateBirth?: string
  telephone?: string
  email?: string
  addressId?: number
  genderIdentityId: number
  ethnicityId: number
  highSchoolStatusId: number
}

type OutputProps = Either<ResourceAlreadyExistsError, { id: number }>

@Injectable()
export class CreateStudentUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const {
      name,
      socialName,
      cpf,
      rg,
      dateBirth,
      telephone,
      email,
      addressId,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
    } = data

    const studentCpfExists = await this.studentRepository.findByCpf(cpf)
    if (studentCpfExists) return left(new ResourceAlreadyExistsError())

    const studentRgExists = await this.studentRepository.findByRg(rg!)
    if (studentRgExists) return left(new ResourceAlreadyExistsError())

    const studentEmailExists = await this.studentRepository.findByEmail(email!)
    if (studentEmailExists) return left(new ResourceAlreadyExistsError())

    const student = Student.create({
      name,
      socialName,
      cpf,
      rg,
      dateBirth: dateBirth || undefined,
      telephone,
      email,
      addressId,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
    })

    const studentCreated = await this.studentRepository.create(student)

    return right(studentCreated)
  }
}
