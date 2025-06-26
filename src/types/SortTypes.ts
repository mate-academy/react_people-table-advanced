export const SortTypes = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
} as const;

export type SortTypesValues = (typeof SortTypes)[keyof typeof SortTypes];
