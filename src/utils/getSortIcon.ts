import { SortField, SortOrder } from '../types/SortTypes';

export const getSortIconClass = (
  currentField: SortField,
  field: SortField,
  order: SortOrder,
) => {
  if (currentField === field) {
    return order === SortOrder.Asc ? 'fa-sort-up' : 'fa-sort-down';
  }

  return 'fa-sort';
};
