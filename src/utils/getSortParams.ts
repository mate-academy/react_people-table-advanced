import { SortBy } from '../types/enumSortBy';

export const getSortParams = (
  sortName: SortBy,
  sortBy: SortBy | null,
  order: string | null,
) => {
  if (!sortBy || sortBy !== sortName) {
    return { sort: sortName, order: null };
  }

  if (!order) {
    return { sort: sortName, order: 'desc' };
  }

  return { sort: null, order: null };
};
