export enum ParamsNames {
  QUERY = 'query',
  SEX = 'sex',
  CENTURIES = 'centuries',
  SORT = 'sort',
  ORDER = 'order',
}

export enum Sex {
  M = 'm',
  F = 'f',
}

export const CENTURIES = ['16', '17', '18', '19', '20'];

export enum SortField {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export const SORT_COLUMNS = [
  SortField.NAME,
  SortField.SEX,
  SortField.BORN,
  SortField.DIED,
];

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}
