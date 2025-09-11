import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@root/domain/authentication/enterprise/interfaces/user'
import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator'
export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  @IsUUID()
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
    description: 'Role of the user',
    enum: UserRole,
  })
  role: UserRole

  @ApiProperty({
    description: 'Indicates if the user is disabled or null if not disabled',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  @IsOptional()
  disabled?: Date

  @ApiProperty({
    description: 'Creation date of the user',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: number

  @ApiProperty({
    description: 'Update date of the user or null if not updated',
    example: '2024-10-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: number
}
