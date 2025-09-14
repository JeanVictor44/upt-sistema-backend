import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'

import { CityDto } from './city.dto'
import { RegionDto } from './region.dto'

interface City {
  id: number
  name: string
}
interface Region {
  id: number
  name: string
}
export class NeighborhoodDetailsDto {
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
    example: {
      id: 1,
      name: 'Simões Filho',
    },
    type: PickType<CityDto, 'id' | 'name'>,
  })
  city: City

  @ApiProperty({
    description: 'Region of the neighborhood',
    example: {
      id: 1,
      name: 'Camaçari',
    },
    type: RegionDto,
  })
  region: Region

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
