import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'

import { TeachingPlaceDetailsDto } from '../../location/entities/teaching-place-details.dto'

interface Shift {
  id: number
  name: string
}

interface Option {
  id: number
  name: string
}

interface Status {
  id: number
  name: string
}

export class StatusDto {
  @ApiProperty({
    description: 'Unique identifier of the status',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the status',
    example: 'ATIVA',
  })
  @IsString()
  name: string
}

export class OptionDto {
  @ApiProperty({
    description: 'Unique identifier of the option',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the option',
    example: 'A',
  })
  @IsString()
  name: string
}

export class ShiftDto {
  @ApiProperty({
    description: 'Unique identifier of the shift',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the shift',
    example: 'MATUTINO',
  })
  @IsString()
  name: string
}

export class ClassDetailsDto {
  @ApiProperty({
    description: 'Unique identifier of the region',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the neighborhood',
    example: 'Manoel Dias',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Teaching place',
    type: TeachingPlaceDetailsDto,
  })
  teachingPlace: TeachingPlaceDetailsDto

  @ApiProperty({
    description: 'Shift of the class',
    example: {
      id: 1,
      name: 'MATUTINO',
    },
    type: ShiftDto,
  })
  shift: Shift

  @ApiProperty({
    description: 'Option of the class',
    example: {
      id: 1,
      name: 'A',
    },
    type: OptionDto,
  })
  option: Option

  @ApiProperty({
    description: 'Status of the class',
    example: {
      id: 1,
      name: 'ATIVA',
    },
    type: StatusDto,
  })
  status: Status

  @ApiProperty({
    description: 'Creation date of the neighborhood',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Update date of the neighborhood',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date
}
