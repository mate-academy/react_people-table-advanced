export enum SexFilter {
  Male = 'm',
  Female = 'f',
  All = '',
}

export enum SortType {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface FiltersParams {
  query: string;
  centuries: string[];
  sex: SexFilter;
  sort: SortType;
  order: SortDirection;
}
