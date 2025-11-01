import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'

import { NeighborhoodDetailsDto } from './neighborhood-details.dto'

export class TeachingPlacePropertyLocationCategoryDto {
  @ApiProperty({
    description: 'Unique identifier of the property location category',
    example: 2,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the property location category',
    example: 'Urbano',
  })
  @IsString()
  name: string
}

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
    description: 'Property location category identifier',
    example: 2,
    type: TeachingPlacePropertyLocationCategoryDto,
  })
  propertyLocationCategory: TeachingPlacePropertyLocationCategoryDto

  @ApiProperty({
    description: 'Traditional community name of the teaching place',
    example: 'Comunidade Quilombola do Rio dos Macacos',
    required: false,
    type: String,
    nullable: true,
  })
  @IsString()
  traditionalCommunityName?: string | undefined

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
