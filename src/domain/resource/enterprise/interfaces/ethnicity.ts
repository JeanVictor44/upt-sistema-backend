export const ethnicities = ['AMARELA', 'BRANCA', 'INDÍGENA', 'PARDA', 'PRETA', 'OUTRA'] as const
export type Ethnicities = (typeof ethnicities)[number]
