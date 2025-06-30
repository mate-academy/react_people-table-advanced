export const SortTypes = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
} as const;

export type SortType = (typeof SortTypes)[keyof typeof SortTypes];
