import cn from 'classnames';

export const getSortingIcon = (
  column: string,
  columnParam: string | null,
  orderParam: string | null,
) => {
  return cn('fas', {
    'fa-sort': columnParam !== column,
    'fa-sort-up': columnParam === column && !orderParam,
    'fa-sort-down': columnParam === column && orderParam,
  });
};
