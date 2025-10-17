import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'
export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johnDoe@hotmail.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Document of the user',
    example: '12345678900',
  })
  @IsString()
  document: string

  @ApiProperty({
    description: 'Telephone number of the user',
    example: '99999999999',
  })
  @IsString()
  telephone: string

  @ApiProperty({
    description: 'Indicates if the user is disabled or null if not disabled',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  disabledAt?: Date

  @ApiProperty({
    description: 'Creation date of the user',
    example: '2024-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    description: 'Update date of the user or null if not updated',
    example: '2024-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  updatedAt: Date
}
