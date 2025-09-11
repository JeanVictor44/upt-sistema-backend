export const classOptions = ['TURMA A', 'TURMA B', 'TURMA C', 'ÚNICA'] as const
export type ClassOption = (typeof classOptions)[number]
