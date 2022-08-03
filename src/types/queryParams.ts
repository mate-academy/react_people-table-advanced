export enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export interface QueryParams {
  query: string;
  sortBy: string;
  sortOrder: string;
}
