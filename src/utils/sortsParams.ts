import classNames from 'classnames';
import { Sorts } from '../types/SortsValue';

export const handlerSortClasses = (
  typeSort: Sorts,
  searchParams: URLSearchParams,
) => {
  return classNames('fas', {
    'fa-sort-up':
      searchParams.get('sort') === typeSort && !searchParams.has('order'),
    'fa-sort-down':
      searchParams.get('sort') === typeSort && searchParams.has('order'),
    'fa-sort': !(searchParams.get('sort') === typeSort),
  });
};

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
