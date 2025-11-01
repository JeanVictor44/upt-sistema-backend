import { ApiOperation, ApiProperty } from '@nestjs/swagger'
import {
  ApiCreated,
  BadRequestResponseDto,
  ConflictResponseDto,
  NotFoundResponseDto,
} from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class EditStudentBodySwaggerDto {
  @ApiProperty({
    description: 'Name of the student',
    example: 'John Doe',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Social name of the student',
    example: 'Johnny',
  })
  @IsString()
  socialName: string

  @ApiProperty({
    description: 'CPF of the student',
    example: '123.456.789-00',
  })
  @IsString()
  cpf: string

  @ApiProperty({
    description: 'RG of the student',
    example: '12.345.678-9',
  })
  @IsString()
  rg: string

  @ApiProperty({
    description: 'Date of birth of the student',
    example: '2000-01-01',
  })
  @IsString()
  dateBirth: string

  @ApiProperty({
    description: 'Telephone of the student',
    example: '(11) 91234-5678',
  })
  @IsString()
  telephone: string

  @ApiProperty({
    description: 'Email of the student',
    example: '',
  })
  @IsString()
  email: string

  @ApiProperty({
    description: 'address id of the Student',
    example: 1,
  })
  @IsNumber()
  addressId: number

  @ApiProperty({
    description: 'gender identity id of the Student',
    example: 1,
  })
  @IsNumber()
  genderIdentityId: number

  @ApiProperty({
    description: 'ethnicity id of the Student',
    example: 1,
  })
  @IsNumber()
  ethnicityId: number

  @ApiProperty({
    description: 'high school status id of the Student',
    example: 1,
  })
  @IsNumber()
  highSchoolStatusId: number
}

const EDITED_DESCRIPTION = 'Student edited successfully'
export const EditStudentSwaggerDto = () => {
  const name = 'EditStudent'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'editStudent',
      summary: 'Edita um aluno',
      description: 'Permite editar um aluno no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    NotFoundResponseDto(name, ['ResourceNotFoundError'], target, key, descriptor)
    ApiCreated(EDITED_DESCRIPTION, target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class EditStudentResponseSwaggerDto {
  @ApiProperty({
    description: EDITED_DESCRIPTION,
  })
  description: typeof EDITED_DESCRIPTION
}
