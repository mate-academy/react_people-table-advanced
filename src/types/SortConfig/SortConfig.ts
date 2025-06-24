import { SortDirection } from '../SortDirection';
import { SortFields } from '../SortFields';

export type SortConfig = {
  columnName: SortFields;
  direction: SortDirection;
};
