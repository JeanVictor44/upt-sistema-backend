import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsUUID } from 'class-validator'

export function createResourceDto<T extends object>(EnumType: T, description: string) {
  class ResourceDto {
    @ApiProperty({
      description: 'Unique identifier of the resource',
      example: 1,
    })
    @IsUUID()
    id: number

    @ApiProperty({
      description,
      enum: EnumType,
      example: Object.values(EnumType)[0],
    })
    @IsEnum(EnumType)
    name: T[keyof T]

    @ApiProperty({
      description: 'Timestamp of when the resource was created',
      example: new Date(),
    })
    createdAt: Date

    @ApiProperty({
      description: 'Timestamp of when the resource was last updated',
      example: new Date(),
    })
    updatedAt: Date
  }

  return ResourceDto
}
