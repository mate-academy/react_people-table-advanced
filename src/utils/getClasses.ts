import cn from 'classnames';

export const getClasses = (columnName: string,
  column: string | null,
  order: string | null) => {
  return cn('fas', {
    'fa-sort': column !== columnName,
    'fa-sort-up': column === columnName && !order,
    'fa-sort-down': column === columnName && order,
  });
};
