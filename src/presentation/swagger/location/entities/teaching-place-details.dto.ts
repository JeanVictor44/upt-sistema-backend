import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'

import { NeighborhoodDetailsDto } from './neighborhood-details.dto'

export class TeachingPlaceDetailsDto {
  @ApiProperty({
    description: 'Unique identifier of the teaching place',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the teaching place',
    example: 'Escola Estadual Manoel Dias',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Neighborhood of the teaching place',
    example: {
      id: 1,
      name: 'Manoel Dias',
      city: {
        id: 1,
        name: 'Simões Filho',
      },
      region: {
        id: 1,
        name: 'Camaçari',
      },
    },
  })
  neighborhood: NeighborhoodDetailsDto

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
