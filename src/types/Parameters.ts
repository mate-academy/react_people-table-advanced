import { Filter } from './Filter';
import { Sex } from './Sex';
import { Order } from './Order';

export interface Parameters {
  filter: Filter,
  sex: Sex,
  order: Order,
  query: string,
  centuries: number[] | null,
}
