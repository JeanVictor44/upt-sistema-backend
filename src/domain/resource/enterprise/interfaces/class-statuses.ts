export const classStatuses = ['ATIVA', 'FECHADA'] as const
export type ClassStatus = (typeof classStatuses)[number]
