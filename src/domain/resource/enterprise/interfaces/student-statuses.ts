export const studentStatuses = ['MATRICULADO', 'EVADIDO', 'APROVADO'] as const
export type StudentStatus = (typeof studentStatuses)[number]
