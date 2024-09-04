import { SortField, SortOrder } from '../types/SortTypes';

export const determineNewOrder = (
  field: SortField,
  currentSortField: SortField | null,
  currentSortOrder: SortOrder | null,
): SortOrder | null => {
  if (currentSortField === field) {
    return currentSortOrder === SortOrder.Asc
      ? SortOrder.Desc
      : currentSortOrder === SortOrder.Desc
        ? null
        : SortOrder.Asc;
  }

  return SortOrder.Asc;
};
