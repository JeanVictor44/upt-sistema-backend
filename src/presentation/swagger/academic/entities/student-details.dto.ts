import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, IsArray } from 'class-validator'

import { PropertyLocationCategoryDto } from '../../resources/docs/list-property-location-category-swagger.dto'

export class StudentHighSchoolStatusDto {
  @ApiProperty({
    description: 'Unique identifier of the high school status',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Description of the high school status',
    example: 'Completed',
  })
  @IsString()
  name: string
}

export class EthnicityDto {
  @ApiProperty({
    description: 'Unique identifier of the ethnicity',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Description of the ethnicity',
    example: 'Hispanic',
  })
  @IsString()
  name: string
}

export class GenderIdentityDto {
  @ApiProperty({
    description: 'Unique identifier of the gender identity',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Description of the gender identity',
    example: 'Female',
  })
  @IsString()
  name: string
}

export class AddressDto {
  @ApiProperty({
    description: 'Unique identifier of the address',
    example: 1,
    type: Number,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Street name of the address',
    example: '123 Main St',
    required: false,
    nullable: true,
    type: String,
  })
  @IsString()
  @IsOptional()
  street?: string | null

  @ApiProperty({
    description: 'Number of the address',
    example: 456,
    nullable: true,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  number?: number | null

  @ApiProperty({
    description: 'Neighborhood of the address',
    example: 'Downtown',
    required: false,
    nullable: true,
    type: String,
  })
  @IsString()
  @IsOptional()
  neighborhood?: string | null

  @ApiProperty({
    description: 'City of the address',
    example: 'Springfield',
    nullable: true,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  city?: string | null

  @ApiProperty({
    description: 'Zip code of the address',
    example: '12345-678',
    nullable: true,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  zipCode?: string | null

  @ApiProperty({
    description: 'Traditional community name of the address',
    example: 'Community A',
    nullable: true,
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  traditionalCommunityName?: string | null

  @ApiProperty({
    description: 'Property location category of the address',
    nullable: true,
    type: () => PropertyLocationCategoryDto,
    required: false,
  })
  @IsOptional()
  propertyLocationCategory?: PropertyLocationCategoryDto | null
}

export class ClassDto {
  @ApiProperty({
    description: 'Unique identifier of the class',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the class',
    example: 'Matemática',
  })
  @IsString()
  name: string
}

export class EditionDto {
  @ApiProperty({
    description: 'Unique identifier of the edition',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Year of the edition',
    example: 2024,
  })
  @IsNumber()
  year: number
}

export class OptionDto {
  @ApiProperty({
    description: 'Name of the option',
    example: 'Turma A',
  })
  @IsString()
  name: string
}

export class TeachingPlaceDto {
  @ApiProperty({
    description: 'Teaching place name',
    example: 'Unidade Escolar ABC',
  })
  @IsString()
  name: string
}

export class ClassEditionDto {
  @ApiProperty({
    description: 'Unique identifier of the class edition',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Number of enrolled students in this class edition',
    example: 25,
  })
  @IsNumber()
  enrolledCount: number

  @ApiProperty({
    description: 'Edition information',
    type: () => EditionDto,
  })
  @Type(() => EditionDto)
  edition: EditionDto

  @ApiProperty({
    description: 'Option information',
    type: () => OptionDto,
  })
  @Type(() => OptionDto)
  option: OptionDto

  @ApiProperty({
    description: 'Teaching Place information',
    type: () => TeachingPlaceDto,
  })
  @Type(() => TeachingPlaceDto)
  teachingPlace: TeachingPlaceDto

  @ApiProperty({
    description: 'Timestamp of when the class edition was created',
    example: new Date(),
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the class edition was last updated',
    example: new Date(),
  })
  @IsDate()
  updatedAt: Date
}

export class EnrollmentDto {
  @ApiProperty({
    description: 'Unique identifier of the enrollment',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Class edition details',
    type: () => ClassEditionDto,
  })
  @Type(() => ClassEditionDto)
  classEdition: ClassEditionDto

  @ApiProperty({
    description: 'Status of the enrollment',
    example: 1,
    type: Number,
  })
  @IsNumber()
  statusId: number

  @ApiProperty({
    description: 'Whether the student is exempt from fees',
    example: false,
  })
  @IsBoolean()
  isExempt: boolean

  @ApiProperty({
    description: 'Date of enrollment',
    example: '2024-01-15',
  })
  @IsString()
  enrollmentDate: string
}

export class StudentDetailsDto {
  @ApiProperty({
    description: 'Unique identifier of the student',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the student',
    example: 'John Doe',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Social name of the student',
    example: 'Johnny',
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  socialName: string | null

  @ApiProperty({
    description: 'CPF of the student',
    example: '123.456.789-00',
  })
  @IsString()
  cpf: string

  @ApiProperty({
    description: 'RG of the student',
    example: '12.345.678-9',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  rg: string | null

  @ApiProperty({
    description: 'Date of birth of the student',
    example: '2000-01-01',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  dateBirth: string | null

  @ApiProperty({
    description: 'Telephone of the student',
    example: '(11) 91234-5678',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  telephone: string | null

  @ApiProperty({
    description: 'Email of the student',
    example: 'example@mail.com',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  email: string | null

  @ApiProperty({
    description: 'Address of the student',
    nullable: true,
    type: () => AddressDto,
  })
  @IsOptional()
  @Type(() => AddressDto)
  address?: AddressDto | null

  @ApiProperty({
    description: 'List of class enrollments',
    type: () => [EnrollmentDto],
  })
  @IsArray()
  @Type(() => EnrollmentDto)
  classEnrollments: EnrollmentDto[]

  @ApiProperty({
    description: 'Gender Identity of the student',
    example: {
      id: 1,
      name: 'FEMININO',
    },
    type: () => GenderIdentityDto,
  })
  @Type(() => GenderIdentityDto)
  genderIdentity: GenderIdentityDto

  @ApiProperty({
    description: 'Ethnicity of the student',
    example: {
      id: 1,
      name: 'PRETO',
    },
    type: () => EthnicityDto,
  })
  @Type(() => EthnicityDto)
  ethnicity: EthnicityDto

  @ApiProperty({
    description: 'High School Status of the student',
    example: {
      id: 1,
      name: 'ATIVA',
    },
    type: () => StudentHighSchoolStatusDto,
  })
  @Type(() => StudentHighSchoolStatusDto)
  highSchoolStatus: StudentHighSchoolStatusDto
}
