import classNames from 'classnames';
import { SortOrder } from '../types/Order';

export const getSortIconClass = ({
  sortField,
  field,
  sortOrder,
}: {
  sortField: string;
  field: string;
  sortOrder: SortOrder;
}) =>
  classNames('fas', {
    'fa-sort-up': sortField === field && sortOrder === SortOrder.Ascending,
    'fa-sort-down': sortField === field && sortOrder === SortOrder.Descending,
    'fa-sort': sortField !== field,
  });
