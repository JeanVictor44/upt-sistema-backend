export const propertyLocationCategories = [
  'ZONA URBANA - CENTRO',
  'ZONA URBANA - PERIFERIA',
  'ZONA RURAL',
  'QUILOMBO',
  'ASSENTAMENTO',
  'ALDEIA INDÍGENA',
  'FUNDO DE PASTO',
  'FECHO DE PASTO',
  'OUTRA',
] as const

export type PropertyLocationCategory = (typeof propertyLocationCategories)[number]
