import * as Excel from 'exceljs'

export const styleRowData = (workSheet: Excel.Worksheet) => {
  const HEADER_ROW = 11

  // Uppercase all data
  workSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber > HEADER_ROW) {
      row.eachCell((cell) => {
        workSheet.getCell(cell.address).alignment = { horizontal: 'left' }

        if (!cell.address.includes('A')) {
          const cellValue = workSheet.getCell(cell.address).value
          if (cellValue && typeof cellValue !== 'object') {
            const valueCell = cellValue.toString()
            workSheet.getCell(cell.address).value = valueCell.toUpperCase()
          }
        }

        if (!cell.address.includes('O')) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          }
        }
      })
    }
  })
}
