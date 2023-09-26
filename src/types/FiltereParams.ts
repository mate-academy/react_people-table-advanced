import { Gender } from './Gender';
import { Order } from './Order';
import { SortType } from './SortType';

export type FilterParams = {
  query: string;
  centuries: string[];
  sex: Gender;
  sort: SortType;
  order: Order;
};
