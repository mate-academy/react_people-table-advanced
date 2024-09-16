import { SortOrder } from '../enums';

export function cycleSortOrder(sortOrder: SortOrder | null): SortOrder | null {
  switch (sortOrder) {
    case null:
      return SortOrder.Ascending;
    case SortOrder.Ascending:
      return SortOrder.Descending;
    case SortOrder.Descending:
      return null;
  }
}
