import { Type } from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger'

// @ts-ignore
export const ApiResponseOk = (description: string, type?: Type<unknown>, target: any, key: any, descriptor: any) => {
  return ApiResponse({ status: 200, description, type })(target, key, descriptor)
}

export const ApiCreated = (description: string, target: any, key: any, descriptor: any) => {
  return ApiCreatedResponse({
    description,
  })(target, key, descriptor)
}

const createErrorResponseDto = (
  name: string,
  message: string,
  error: string,
  statusCode: number,
  errorEnum: string[],
) => {
  class ErrorResponseDto {
    @ApiProperty({ default: message })
    message: string

    @ApiProperty({ default: error, enum: errorEnum })
    error: string

    @ApiProperty({ default: statusCode })
    statusCode: number
  }

  Object.defineProperty(ErrorResponseDto, 'name', { value: name })

  return ErrorResponseDto
}

export const BadRequestResponseDto = (name: string, errors: Array<string>, target: any, key: any, descriptor: any) => {
  const uniqueName = `${name}BadRequestResponseDto`

  return ApiResponse({
    status: 400,
    description: 'Bad request',
    type: createErrorResponseDto(uniqueName, 'Bad request', errors.join(' | '), 400, errors),
  })(target, key, descriptor)
}

export const NotFoundResponseDto = (name: string, errors: Array<string>, target: any, key: any, descriptor: any) => {
  const uniqueName = `${name}NotFoundResponseDto`
  return ApiResponse({
    status: 404,
    description: 'Resource not found',
    type: createErrorResponseDto(uniqueName, 'Resource not found', errors.join(' | '), 404, errors),
  })(target, key, descriptor)
}

export const UnauthorizedResponseDto = (
  name: string,
  errors: Array<string>,
  target: any,
  key: any,
  descriptor: any,
) => {
  const uniqueName = `${name}UnauthorizedResponseDto`
  return ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: createErrorResponseDto(uniqueName, 'Unauthorized request', errors.join(' | '), 401, errors),
  })(target, key, descriptor)
}

export const ConflictResponseDto = (name: string, errors: Array<string>, target: any, key: any, descriptor: any) => {
  const uniqueName = `${name}ConflictResponseDto`
  return ApiResponse({
    status: 409,
    description: 'Conflict',
    type: createErrorResponseDto(uniqueName, 'Conflict', errors.join(' | '), 409, errors),
  })(target, key, descriptor)
}
