import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class UserRoleManagerDetailsDto {
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
    description: '',
    example: 'johnDoe@hotmail.com',
    type: Date,
  })
  @IsString()
  startDate: Date

  @ApiProperty({
    description: 'End date of the user role',
    example: '2023-12-31T23:59:59Z',
    type: Date,
    nullable: true,
  })
  @IsString()
  endDate: Date | null
}
