import { ApiProperty } from '@nestjs/swagger'
import { ClassWithDetailsDTO } from '@root/domain/academic/applications/dtos/class-with-details.dto'
import { Type } from 'class-transformer'
import { IsDate, IsNumber } from 'class-validator'

import { ClassDetailsDto } from './class-details.dto'
import { EditionDto } from './edition.dto'

export class ClassEditionDetailsDto {
  @ApiProperty({
    description: 'Unique identifier of the status',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Class details',
    type: ClassDetailsDto,
  })
  @Type(() => ClassDetailsDto)
  class: ClassWithDetailsDTO

  @ApiProperty({
    description: 'Edition details',
    type: EditionDto,
  })
  @Type(() => EditionDto)
  edition: EditionDto

  @ApiProperty({
    description: 'Enrolled count in the class edition',
    example: 20,
  })
  @IsNumber()
  enrolledCount: number

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
