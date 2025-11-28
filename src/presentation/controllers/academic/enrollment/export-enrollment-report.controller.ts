import { BadRequestException, Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ExportEnrollmentReportUseCase } from '@root/domain/academic/applications/use-cases/enrollment/export-enrollment-report.use-case'
import { ExcelGeneratorService } from '@root/presentation/services/excel-generator.service'
import {
  ExportEnrollmentReportBodySwaggerDto,
  ExportEnrollmentReportSwaggerDto,
} from '@root/presentation/swagger/academic/docs/enrollment/export-enrollment-report-swagger.dto'
import { Response } from 'express'

@ApiTags('Academic')
@Controller({ path: '/academic', version: '1' })
export class ExportEnrollmentReportController {
  constructor(
    private readonly exportEnrollmentReportUseCase: ExportEnrollmentReportUseCase,
    private readonly excelGeneratorService: ExcelGeneratorService,
  ) {}

  @ApiBearerAuth()
  @Post('/enrollment-report/export')
  @HttpCode(200)
  @ExportEnrollmentReportSwaggerDto()
  async handle(@Body() body: ExportEnrollmentReportBodySwaggerDto, @Res() res: Response) {
    const { regionId } = body

    if (!regionId) {
      throw new BadRequestException('regionId é obrigatório')
    }

    try {
      // Buscar dados dos alunos matriculados
      const result = await this.exportEnrollmentReportUseCase.execute(regionId)

      if (result.isLeft()) {
        throw new BadRequestException('Erro ao buscar dados do relatório')
      }

      const enrollments = result.value

      // Gerar arquivo Excel
      const buffer = await this.excelGeneratorService.generateEnrollmentReport(enrollments)

      // Configurar headers e enviar arquivo
      const fileName = `relatorio-polo-${regionId}-${new Date().toISOString().split('T')[0]}.xlsx`
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': buffer.byteLength,
      })

      res.send(buffer)
    } catch (error) {
      throw new BadRequestException('Erro ao gerar relatório', { description: error.message })
    }
  }
}
