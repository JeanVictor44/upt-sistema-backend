import { Student } from '@root/domain/academic/enterprise/entities/student'

import { StudentSchemaInsertProps, StudentSchemaSelectProps } from '@infra/database/drizzle/schemas'

export class StudentMappers {
  static toDomain(data: StudentSchemaSelectProps): Student {
    return Student.create(
      {
        name: data.name,
        cpf: data.cpf,
        rg: data.rg || undefined,
        dateBirth: data.dateBirth || undefined,
        socialName: data.socialName || undefined,
        telephone: data.telephone || undefined,
        email: data.email || undefined,
        addressId: data.addressId || undefined,
        genderIdentityId: data.genderIdentityId,
        ethnicityId: data.ethnicityId,
        highSchoolStatusId: data.highSchoolStatusId,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      data.id,
    )
  }

  static toPersistence(data: Student): StudentSchemaInsertProps {
    return {
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      rg: data.rg || null,
      dateBirth: data.dateBirth?.toString() || null,
      socialName: data.socialName || null,
      telephone: data.telephone || null,
      email: data.email || null,
      addressId: data.addressId || null,
      genderIdentityId: data.genderIdentityId,
      ethnicityId: data.ethnicityId,
      highSchoolStatusId: data.highSchoolStatusId,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }
  }
}
