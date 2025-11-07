import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'
export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
    type: Number,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johnDoe@hotmail.com',
    type: String,
  })
  @IsString()
  email: string

  @ApiProperty({
    description: 'Document of the user',
    example: '12345678900',
    type: String,
  })
  @IsString()
  document: string

  @ApiProperty({
    description: 'Telephone number of the user',
    example: '99999999999',
    type: String,
  })
  @IsString()
  telephone: string

  @ApiProperty({
    description: 'Indicates if the user is disabled or null if not disabled',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  disabledAt?: Date

  @ApiProperty({
    description: 'Creation date of the user',
    example: '2024-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Update date of the user or null if not updated',
    example: '2024-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  updatedAt: Date
}

export class UserWithDetailsDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
    type: Number,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johnDoe@hotmail.com',
    type: String,
  })
  @IsString()
  email: string

  @ApiProperty({
    description: 'Document of the user',
    example: '12345678900',
    type: String,
  })
  @IsString()
  document: string

  @ApiProperty({
    description: 'Telephone number of the user',
    example: '99999999999',
    type: String,
  })
  @IsString()
  telephone: string

  @ApiProperty({
    description: 'Indicates if the user is disabled or null if not disabled',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  disabledAt?: Date

  @ApiProperty({
    description: 'Creation date of the user',
    example: '2024-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Update date of the user or null if not updated',
    example: '2024-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  updatedAt: Date

  @ApiProperty({
    description: 'Role ID of the user',
    example: 2,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  roleId?: number

  @ApiProperty({
    description: 'Class Edition ID of the user',
    example: 3,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  classEditionId?: number

  @ApiProperty({
    description: 'Region ID of the user',
    example: 4,
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  regionId?: number
}
