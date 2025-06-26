import { SearchParams } from './searchHelper';

export function getNextSortParams(
  currentSort: string | null,
  currentOrder: string | null,
  key: string,
): SearchParams {
  if (currentSort !== key) {
    return { sort: key, order: null };
  }

  if (currentOrder !== 'desc') {
    return { sort: key, order: 'desc' };
  }

  return { sort: null, order: null };
}
