export const highschoolStatuses = ['CONCLUÍDO', 'EM CURSO'] as const
export type HighschoolStatus = (typeof highschoolStatuses)[number]
