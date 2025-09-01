import { SortBy, SortOrder } from '../types/sort';
import { getSearchWith } from './searchHelper';

export const getCurrentSortState = (
  column: SortBy,
  sortBy: SortBy,
  order: SortOrder,
) => {
  if (sortBy !== column) {
    return 'none';
  }

  return order === 'desc' ? 'desc' : 'asc';
};

export const getNextSortState = (state: SortOrder) => {
  if (state === 'none') {
    return 'asc';
  }

  if (state === 'asc') {
    return 'desc';
  }

  return 'none';
};

export const setSearch = (
  column: SortBy,
  sortBy: SortBy,
  order: SortOrder,
  searchParams: URLSearchParams,
) => {
  const current = getCurrentSortState(column, sortBy, order);
  const next = getNextSortState(current);

  if (next === 'none') {
    return getSearchWith(searchParams, { sort: null, order: null });
  }

  if (next === 'asc') {
    return getSearchWith(searchParams, { sort: column, order: null });
  }

  return getSearchWith(searchParams, { sort: column, order: 'desc' });
};
