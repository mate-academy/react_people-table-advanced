export const FILTERBYSEX = {
  all: 'all',
  male: 'male',
  female: 'female',
} as const;

export type FilterBySex = (typeof FILTERBYSEX)[keyof typeof FILTERBYSEX];
