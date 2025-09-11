import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsString, IsUUID } from 'class-validator'

export class RegionDto {
  @ApiProperty({
    description: 'Unique identifier of the region',
    example: 1,
  })
  @IsUUID()
  id: number

  @ApiProperty({
    description: 'Name of the region',
    example: 'Camaçari',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Creation date of the region',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Update date of the region',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date
}
