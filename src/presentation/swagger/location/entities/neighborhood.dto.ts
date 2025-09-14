import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'

export class NeighborhoodDto {
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
    description: 'City of the neighborhood',
    example: 1,
  })
  @IsNumber()
  cityId: number

  @ApiProperty({
    description: 'Region of the neighborhood',
    example: 1,
  })
  @IsNumber()
  regionId: number

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
