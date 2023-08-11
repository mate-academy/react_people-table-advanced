import { Order, Sort } from './SortOptions';

export enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

export interface FilterOptions {
  query: string,
  centuries: string[],
  sex: Sex,
  sort: Sort,
  order: Order,
}
