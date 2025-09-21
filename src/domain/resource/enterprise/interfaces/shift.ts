export const shifts = ['MATUTINO', 'VESPERTINO', 'NOTURNO'] as const

export type Shift = (typeof shifts)[number]
