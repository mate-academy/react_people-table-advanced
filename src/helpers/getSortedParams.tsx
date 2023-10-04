import { SearchParams } from '../utils/searchHelper';

export function getSortedParams(
  newSortType: string,
  prevSortType: string,
  order: string,
): SearchParams {
  if (prevSortType !== newSortType) {
    return {
      sort: newSortType,
      order: null,
    };
  }

  if (prevSortType === newSortType && !order) {
    return { order: 'desc' };
  }

  return {
    sort: null,
    order: null,
  };
}
