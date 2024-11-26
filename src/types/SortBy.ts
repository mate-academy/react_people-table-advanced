import { SortBy } from './SortType';

export type Sort = {
  sortBy: SortBy | null;
  order: 'asc' | 'desc' | null;
};
