export const genderIdentity = [
  'FEMININO - CISGÊNERO',
  'MASCULINO - CISGÊNERO',
  'TRANSGÊNERO',
  'NÃO BINÁRIO',
  'MULHER TRANS',
  'HOMEM TRANS',
] as const
export type GenderIdentities = (typeof genderIdentity)[number]
