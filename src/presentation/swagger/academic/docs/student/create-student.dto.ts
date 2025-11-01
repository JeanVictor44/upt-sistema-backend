import { ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { BadRequestResponseDto, ConflictResponseDto } from '@utils/swagger-api-response'
import { IsNumber, IsString } from 'class-validator'

export class CreateStudentBodySwaggerDto {
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

export class StudentCreatedSwaggerDto {
  @ApiProperty({
    description: 'ID of the created student',
    example: 1,
    type: Number,
  })
  @IsNumber()
  id: number
}

const CREATED_DESCRIPTION = 'Student created successfully'
export const CreateStudentSwaggerDto = () => {
  const name = 'CreateStudent'

  return function (target: any, key: any, descriptor: any) {
    ApiOperation({
      operationId: 'createStudent',
      summary: 'Criar um novo aluno',
      description: 'Permite o cadastro de um novo aluno no sistema',
    })(target, key, descriptor)
    ConflictResponseDto(name, ['ResourceAlreadyExistsError'], target, key, descriptor)
    ApiCreatedResponse({
      type: CreateStudentResponseSwaggerDto,
      description: CREATED_DESCRIPTION,
    })(target, key, descriptor)
    BadRequestResponseDto(name, ['BadRequestError'], target, key, descriptor)
  }
}

export class CreateStudentResponseSwaggerDto {
  @ApiProperty({
    description: CREATED_DESCRIPTION,
    type: StudentCreatedSwaggerDto,
  })
  result: StudentCreatedSwaggerDto
}
