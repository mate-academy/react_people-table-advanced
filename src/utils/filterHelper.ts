import classNames from 'classnames';
import { SearchParams } from './searchHelper';

export const getSortClass = (
  current: string,
  currentSort: string | null,
  currentOrder: string | null,
) => {
  const isCurrent = currentSort === current;

  return (classNames('fas', {
    'fa-sort': !isCurrent,
    'fa-sort-up': isCurrent && !currentOrder,
    'fa-sort-down': isCurrent && !!currentOrder,
  }));
};

export const getSortParams = (
  param: string,
  currentSort: string | null,
  currentOrder: string | null,
): SearchParams => {
  if (currentSort === param && !currentOrder) {
    return { order: 'desc' };
  }

  if (currentSort === param && currentOrder) {
    return { sort: null, order: null };
  }

  return { sort: param };
};
