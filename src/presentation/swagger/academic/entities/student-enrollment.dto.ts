import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class EnrollmentStatusDto {
  @ApiProperty({
    description: 'Unique identifier of the enrollment status',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the enrollment status',
    example: 'ATIVA',
    enum: ['MATRICULADO', 'EVADIDO', 'APROVADO'],
  })
  @IsString()
  name: string
}

export class StudentAttendanceDto {
  @ApiProperty({
    description: 'Unique identifier of the attendance record',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Attendance Month',
    example: 3,
    type: Number,
  })
  @IsNumber()
  month: number

  @ApiProperty({
    description: 'Attendance Year',
    example: 2025,
    type: Number,
  })
  @IsNumber()
  year: number

  @ApiProperty({
    description: 'Whether the student was present',
    type: Boolean,
  })
  @IsBoolean()
  isPresent: boolean
}

export class StudentEnrollmentDto {
  @ApiProperty({
    description: 'Unique identifier of the student',
    example: 1,
  })
  @IsNumber()
  studentId: number

  @ApiProperty({
    description: 'Unique identifier of the enrollment',
    example: 1,
  })
  @IsNumber()
  enrollmentId: number

  @ApiProperty({
    description: 'Name of the student',
    example: 'John Doe',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Social name of the student',
    example: 'Johnny',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  socialName?: string

  @ApiProperty({
    description: 'CPF of the student',
    example: '123.456.789-00',
  })
  @IsString()
  cpf: string

  @ApiProperty({
    description: 'Telephone of the student',
    example: '(11) 91234-5678',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  telephone?: string

  @ApiProperty({
    description: 'List of student attendances',
    type: [StudentAttendanceDto],
  })
  @Type(() => StudentAttendanceDto)
  attendances: StudentAttendanceDto[]

  @ApiProperty({
    description: 'Enrollment status details',
    type: () => EnrollmentStatusDto,
  })
  @Type(() => EnrollmentStatusDto)
  enrollmentStatus: EnrollmentStatusDto

  @ApiProperty({
    description: 'Date of enrollment',
    example: '2024-01-15',
  })
  @IsString()
  enrollmentDate: string

  @ApiProperty({
    description: 'Whether the student is exempt from fees',
    example: false,
  })
  @IsBoolean()
  isExempt: boolean

  @ApiProperty({
    description: 'Timestamp of when the enrollment was created',
    example: new Date(),
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Timestamp of when the enrollment was last updated',
    example: new Date(),
    nullable: true,
    required: false,
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date
}
