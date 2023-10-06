import { SexFilter } from './SexFilter';
import { Order } from './Order';
import { SortType } from './SortType';

export type FilterParams = {
  query: string;
  centuries: string[];
  sex: SexFilter;
  sort: SortType;
  order: Order;
};
