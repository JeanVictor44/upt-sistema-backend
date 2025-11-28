import { Injectable } from '@nestjs/common'
import { EnrollmentReportDTO } from '@root/domain/academic/applications/dtos/enrollment-report.dto'
import { createHeaderExcel } from '@root/utils/create-header-excel'
import { createRowTitle } from '@root/utils/create-row-title-excel'
import { styleRowData } from '@root/utils/style-row-data-excel'
import * as Excel from 'exceljs'

@Injectable()
export class ExcelGeneratorService {
  async generateEnrollmentReport(enrollments: EnrollmentReportDTO[]): Promise<Buffer> {
    // Criar workbook e worksheet
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Relatório de Matrículas')

    // Criar header
    createHeaderExcel(worksheet, workbook)

    // Definir cabeçalhos das colunas (linha 11 conforme padrão)
    const headers = [
      'Nome do Polo',
      'Município Local da Turma',
      'Unidade/Escola',
      'Categoria Localização Escola',
      'Comunidade Tradicional Escola',
      'Nome Completo',
      'Nome Social',
      'CPF',
      'RG',
      'Data de Nascimento',
      'Telefone',
      'Email',
      'Identidade de Gênero',
      'Etnia',
      'Logradouro e Número',
      'Bairro/Localidade',
      'CEP',
      'Município',
      'Categoria Localização Residência',
      'Comunidade Tradicional Residência',
      'Situação Ensino Médio',
      'Turma',
      'Data de Matrícula',
      'Status Matrícula',
    ]

    // Definir colunas com larguras
    const columns = [
      { key: 'regionName', width: 20 },
      { key: 'cityName', width: 25 },
      { key: 'teachingPlaceName', width: 30 },
      { key: 'teachingPlaceCategory', width: 25 },
      { key: 'teachingPlaceCommunity', width: 30 },
      { key: 'studentName', width: 35 },
      { key: 'socialName', width: 35 },
      { key: 'cpf', width: 15 },
      { key: 'rg', width: 15 },
      { key: 'dateBirth', width: 15 },
      { key: 'telephone', width: 15 },
      { key: 'email', width: 30 },
      { key: 'genderIdentity', width: 20 },
      { key: 'ethnicity', width: 15 },
      { key: 'addressStreet', width: 40 },
      { key: 'neighborhood', width: 25 },
      { key: 'zipCode', width: 12 },
      { key: 'addressCity', width: 25 },
      { key: 'addressCategory', width: 25 },
      { key: 'addressCommunity', width: 30 },
      { key: 'highSchoolStatus', width: 20 },
      { key: 'classOption', width: 15 },
      { key: 'enrollmentDate', width: 15 },
      { key: 'enrollmentStatus', width: 20 },
    ]

    // Aplicar estilo nos títulos (linha 11)
    createRowTitle(worksheet, headers, /^[A-X]11$/, columns)

    // Função auxiliar para formatar datas (evitando problema de timezone)
    const formatDate = (dateString: string | null | undefined): string => {
      if (!dateString) return ''
      // Extrair componentes diretamente da string no formato YYYY-MM-DD
      const [year, month, day] = dateString.split('T')[0].split('-')
      return `${day}/${month}/${year}`
    }

    // Adicionar dados
    let currentRow = 12
    for (const enrollment of enrollments) {
      worksheet.getRow(currentRow).values = [
        enrollment.regionName,
        enrollment.cityName,
        enrollment.teachingPlaceName,
        enrollment.teachingPlacePropertyLocationCategoryName || '',
        enrollment.teachingPlaceTraditionalCommunityName || '',
        enrollment.studentName,
        enrollment.socialName || '',
        enrollment.cpf,
        enrollment.rg || '',
        formatDate(enrollment.dateBirth),
        enrollment.telephone || '',
        enrollment.email || '',
        enrollment.genderIdentityName,
        enrollment.ethnicityName,
        enrollment.addressStreet && enrollment.addressNumber
          ? `${enrollment.addressStreet}, ${enrollment.addressNumber}`
          : enrollment.addressStreet || '',
        enrollment.addressNeighborhood || '',
        enrollment.zipCode || '',
        enrollment.addressCity || '',
        enrollment.addressPropertyLocationCategoryName || '',
        enrollment.addressTraditionalCommunityName || '',
        enrollment.highSchoolStatusName,
        enrollment.classOptionName,
        formatDate(enrollment.enrollmentDate),
        enrollment.enrollmentStatusName,
      ]
      currentRow++
    }

    // Aplicar estilos nas linhas de dados
    styleRowData(worksheet)

    // Gerar buffer do Excel
    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }
}
