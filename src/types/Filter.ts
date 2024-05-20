const FILTER = {
  all: 'all',
  male: 'male',
  female: 'female',
} as const;

export type Filter = (typeof FILTER)[keyof typeof FILTER];
