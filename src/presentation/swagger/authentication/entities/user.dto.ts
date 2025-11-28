import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class RoleInfoDto {
  @ApiProperty({
    description: 'Unique identifier of the role',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiProperty({
    description: 'Name of the role',
    example: 'ADMIN',
  })
  @IsString()
  @IsOptional()
  name?: string
}
export class RegionInfoDto {
  @ApiProperty({
    description: 'Unique identifier of the region',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiProperty({
    description: 'Name of the region',
    example: 'Norte',
  })
  @IsString()
  @IsOptional()
  name?: string
}

export class ClassEditionInfoDto {
  @ApiProperty({
    description: 'Unique identifier of the class edition',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiProperty({
    description: 'Name of the class',
    example: 'Matemática',
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    description: 'Year of the edition',
    example: 2024,
  })
  @IsNumber()
  @IsOptional()
  year?: number
}
export class RoleHistoryItemDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'ADMIN',
  })
  @IsString()
  @IsOptional()
  role?: string

  @ApiProperty({
    description: 'class edition associated with the role',
    type: () => ClassEditionInfoDto,
    required: false,
  })
  @IsOptional()
  @Type(() => ClassEditionInfoDto)
  classEdition?: ClassEditionInfoDto

  @ApiProperty({
    description: 'region associated with the role',
    type: () => RegionInfoDto,
    required: false,
  })
  @IsOptional()
  @Type(() => RegionInfoDto)
  region?: RegionInfoDto

  @ApiProperty({
    description: 'Date when the role was assigned',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  startDate?: Date

  @ApiProperty({
    description: 'Date when the role was removed',
    example: '2024-12-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  endDate?: Date
}

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
    description: 'Role information of the user',
    type: () => RoleInfoDto,
    required: false,
  })
  @IsOptional()
  @Type(() => RoleInfoDto)
  role?: RoleInfoDto

  @ApiProperty({
    description: 'Class Edition information of the user',
    type: () => ClassEditionInfoDto,
    required: false,
  })
  @IsOptional()
  @Type(() => ClassEditionInfoDto)
  classEdition?: ClassEditionInfoDto

  @ApiProperty({
    description: 'Region information of the user',
    type: () => RegionInfoDto,
    required: false,
  })
  @IsOptional()
  @Type(() => RegionInfoDto)
  region?: RegionInfoDto

  @ApiProperty({
    description: 'Roles history of the user',
    type: () => [RoleHistoryItemDto],
    required: false,
  })
  @IsOptional()
  @Type(() => RoleHistoryItemDto)
  rolesHistory: RoleHistoryItemDto[]
}
