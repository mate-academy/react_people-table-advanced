import { Sorts } from '../types/Sorts';

export const sortSearchParams = (
  typesort: Sorts,
  searchParams: URLSearchParams,
) => {
  if (!searchParams.has('sort')) {
    return { sort: typesort, order: null };
  }

  if (searchParams.has('order') && searchParams.get('sort') === typesort) {
    return { sort: null, order: null };
  }

  if (searchParams.get('sort') !== typesort) {
    return { sort: typesort, order: null };
  }

  return { sort: typesort, order: 'desc' };
};
