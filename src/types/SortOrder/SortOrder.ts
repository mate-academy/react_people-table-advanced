export type SortOrder = {
  name?: 'asc' | 'desc';
  sex?: 'asc' | 'desc';
  born?: 'asc' | 'desc';
  died?: 'asc' | 'desc';
};

export const SORTING = {
  NAME: 'name',
  SEX: 'sex',
  BORN: 'born',
  DIED: 'died',
} as const;
