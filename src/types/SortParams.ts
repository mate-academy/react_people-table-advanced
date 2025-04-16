import { SortOrderValue } from '../constants/SortOrderValue';
import { Person } from './Person';

export interface PeopleSortParams {
  sortField: keyof Person | null;
  sortOrder: SortOrderValue | null;
}
