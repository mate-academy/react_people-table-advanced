export enum SortTypes {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export type SortType = `${SortTypes}`;

export type SortTypeKey = keyof typeof SortTypes;
