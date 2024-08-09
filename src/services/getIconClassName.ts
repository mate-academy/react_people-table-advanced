import classNames from 'classnames';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';

export const getSortIconClassName = (
  currentField: SortField,
  sortField: SortField | null,
  order: SortOrder | null,
) => {
  return classNames('fas', {
    'fa-sort-up': sortField === currentField && order === SortOrder.ASC,
    'fa-sort-down': sortField === currentField && order === SortOrder.DESC,
    'fa-sort': sortField !== currentField,
  });
};
