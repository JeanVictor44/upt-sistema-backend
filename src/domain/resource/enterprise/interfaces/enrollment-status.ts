export const enrollmentStatuses = ['MATRICULADO', 'EVADIDO', 'APROVADO'] as const
export type EnrollmentStatus = (typeof enrollmentStatuses)[number]
