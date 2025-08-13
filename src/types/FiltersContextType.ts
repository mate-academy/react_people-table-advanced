import { SearchParams } from '../utils/searchHelper';
import { Sex } from './Sex';

export interface FiltersContextType {
  query: string;
  sex: Sex;
  centuries: string[];
  sort: string;
  order: string;
  updateSearchParams: (params: SearchParams) => void;
}
