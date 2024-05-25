import { Sort } from './Sort';

export type Sex = 'm' | 'f' | '';

export type Filter = {
  sex: Sex | string;
  query: string;
  centuries: string[];
  order: 'desc' | string;
  sort: Sort | string;
};
