import { SortField } from '../types/SortField';

export const getSortIconClass = (
  sortField: SortField,
  sort: string | null,
  order: string | null,
) => {
  if (sort !== sortField) {
    return 'fas fa-sort';
  } else if (order === null) {
    return 'fas fa-sort-up';
  } else {
    return 'fas fa-sort-down';
  }
};
