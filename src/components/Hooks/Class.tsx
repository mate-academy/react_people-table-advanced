import classNames from 'classnames';
import { Category } from '../../types/categoty';
import { Order } from '../../types/order';

export const Class = (field: Category, searchParams: URLSearchParams) => {
  const sortField = searchParams.get('sort');
  const isFieldSorted = sortField === field;
  const isDescending = searchParams.get('order') === Order.DESC;

  return classNames('fas', {
    'fa-sort': !isFieldSorted,
    'fa-sort-up': isFieldSorted && !isDescending,
    'fa-sort-down': isFieldSorted && isDescending,
  });
};
