import cn from 'classnames';
import { Constans } from '../types';

export const getSortIconClass = (
  sort: string | null,
  direction: string | null,
  normalizedOption: string,
) => {
  return cn('fas', {
    'fa-sort': sort !== normalizedOption,
    'fa-sort-up': sort === normalizedOption && !direction,
    'fa-sort-down': sort === normalizedOption && direction === Constans.DESC,
  });
};
