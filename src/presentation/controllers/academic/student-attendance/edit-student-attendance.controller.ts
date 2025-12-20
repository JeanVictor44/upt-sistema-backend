import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { EditStudentAttendanceUseCase } from '@root/domain/academic/applications/use-cases/student-attendance/edit-student-attendance.use-case'
import { CurrentUser } from '@root/presentation/auth/current-user-decorator'
import { UserPayload } from '@root/presentation/auth/jwt.strategy'
import {
  EditStudentAttendanceBodySwaggerDto,
  EditStudentAttendanceResponseSwaggerDto,
  EditStudentAttendanceSwaggerDto,
} from '@root/presentation/swagger/academic/docs/student-attendance/edit-student-attendance-swagger.dto'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class EditStudentAttendanceController {
  constructor(private editStudentAttendance: EditStudentAttendanceUseCase) {}

  @ApiBearerAuth()
  @Put('/student-attendance/:enrollmentId')
  @HttpCode(201)
  @EditStudentAttendanceSwaggerDto()
  async handle(
    @Body() body: EditStudentAttendanceBodySwaggerDto,
    @CurrentUser() user: UserPayload,
    @Param('enrollmentId') enrollmentId: number,
  ): Promise<EditStudentAttendanceResponseSwaggerDto> {
    const { isPresent, month, year } = body

    const result = await this.editStudentAttendance.execute({
      enrollmentId,
      month,
      year,
      isPresent,
      markedByUserId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        default:
          throw new BadRequestException('Bad request', { description: 'BadRequestError' })
      }
    }

    return {
      description: 'Student Attendance edited successfully',
    }
  }
}
