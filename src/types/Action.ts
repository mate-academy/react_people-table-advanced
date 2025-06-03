import { IPerson } from './IPerson';
import { SortType } from './State';

export type Sex = 'm' | 'f' | null;

export type Filter = {
  query: string;
  centuries: string[];
  sort: SortType | null;
  order: string | null;
  sex: Sex;
};

export type Action =
  | { type: 'FETCH_START' }
  | { type: 'SET_FILTERS_AND_SORT'; payload: Filter }
  | { type: 'FETCH_SUCCESS'; payload: IPerson[] }
  | { type: 'FETCH_ERROR' };
