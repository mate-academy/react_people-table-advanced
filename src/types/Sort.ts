export enum SortKey {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export type SortOrder = 'asc' | 'desc' | null;

export type SortState = {
  [key in SortKey]: SortOrder;
};
