import classNames from 'classnames';
import { Sorts } from '../types/Sorts';

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
