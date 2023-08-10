export enum Gender {
  Male = 'm',
  Female = 'f',
  All = '',
}

export enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export interface FilterParams {
  query: string;
  centuries: string[];
  sex: Gender;
  sort: SortType;
  order: Order;
}
