export const FILTERBYCENTURIES = {
  16: '16',
  17: '17',
  18: '18',
  19: '19',
  20: '20',
  all: 'all',
} as const;

export type FilterByCenturies =
  (typeof FILTERBYCENTURIES)[keyof typeof FILTERBYCENTURIES];
