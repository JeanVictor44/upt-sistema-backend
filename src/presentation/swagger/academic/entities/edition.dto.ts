import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber } from 'class-validator'

export class EditionDto {
  @ApiProperty({
    description: 'Unique identifier of the year',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Year of the edition',
    example: 2025,
  })
  @IsNumber()
  year: number

  @ApiProperty({
    description: 'Creation date of the year',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Update date of the year',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date
}
