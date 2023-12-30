import classNames from 'classnames';
import { SortCategory } from '../types/sortCategory';
import { SortOrder } from '../types/sortOrder';

export const getSortIconClass = (
  field: SortCategory, searchParams: URLSearchParams,
) => {
  const sortField = searchParams.get('sort');
  const isFieldSorted = sortField === field;
  const isDescending = searchParams.get('order') === SortOrder.DESC;

  return classNames('fas', {
    'fa-sort': !isFieldSorted,
    'fa-sort-up': isFieldSorted && !isDescending,
    'fa-sort-down': isFieldSorted && isDescending,
  });
};
