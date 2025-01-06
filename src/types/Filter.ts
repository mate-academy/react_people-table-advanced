export interface Params {
  sortBy: string | null;
  sortOrder: string | null;
  query: string;
  sex: string;
  centuries: number[];
}

export enum SortTable {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}

export enum SexFilterValues {
  All = 'All',
  M = 'Male',
  F = 'Female',
}

export enum PersonSex {
  M = 'm',
  Female = 'f',
}

export enum Parents {
  Mother = 'mother',
  Father = 'father',
}

export enum Status {
  Loading = 'loading',
  Error = 'error',
  Loaded = 'loaded',
  Empty = 'empty',
}
