import { Injectable } from '@nestjs/common'
import { ResourceAlreadyExistsError } from '@root/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@root/core/errors/errors/resource-not-found-error'

import { Either, left, right } from '@core/logic/Either'

import { StudentRepository } from '../../repositories/student-repository'

type InputProps = {
  id: number
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

type OutputProps = Either<ResourceAlreadyExistsError | ResourceNotFoundError, null>

@Injectable()
export class EditStudentUseCase {
  constructor(private readonly studentRepository: StudentRepository) {}

  async execute(data: InputProps): Promise<OutputProps> {
    const {
      id,
      cpf,
      ethnicityId,
      genderIdentityId,
      highSchoolStatusId,
      name,
      addressId,
      dateBirth,
      email,
      rg,
      socialName,
      telephone,
    } = data

    const student = await this.studentRepository.findById(id)
    if (!student) return left(new ResourceNotFoundError())

    const studentAlreadyExists = await this.studentRepository.findByCpf(cpf)
    if (studentAlreadyExists && studentAlreadyExists.id !== student.id) return left(new ResourceAlreadyExistsError())

    student.name = name
    student.socialName = socialName
    student.cpf = cpf
    student.rg = rg
    student.dateBirth = dateBirth || undefined
    student.telephone = telephone
    student.email = email
    student.addressId = addressId
    student.genderIdentityId = genderIdentityId
    student.ethnicityId = ethnicityId
    student.highSchoolStatusId = highSchoolStatusId

    await this.studentRepository.save(student)

    return right(null)
  }
}
