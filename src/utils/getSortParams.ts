import { Sort } from '../types/Sort';

export const getSortParams = (
  currentSort: Sort | null,
  currentOrder: string | null,
  sortBy: Sort,
) => {
  if (currentSort === sortBy && !currentOrder) {
    return { sort: sortBy, order: 'desc' };
  }

  if (currentSort !== sortBy) {
    return { sort: sortBy, order: null };
  }

  return { sort: null, order: null };
};
