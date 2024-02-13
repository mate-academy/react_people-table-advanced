import classNames from 'classnames';

export const getClasses = (columnName: string,
  column: string | null,
  order: string | null) => {
  return classNames('fas', {
    'fa-sort': column !== columnName,
    'fa-sort-up': column === columnName && !order,
    'fa-sort-down': column === columnName && order,
  });
};

export const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('navbar-item',
  { 'has-background-grey-lighter': isActive });
