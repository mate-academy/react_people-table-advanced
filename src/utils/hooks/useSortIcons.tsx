import classNames from 'classnames';

interface SortParams {
  sortParam: string | null;
  orderParam: string | null;
}

export function useSortIcons({ sortParam, orderParam }: SortParams) {
  const sortClasses = {
    died: classNames('fas', {
      'fa-sort-up': sortParam === 'died' && orderParam !== 'desc',
      'fa-sort-down': sortParam === 'died' && orderParam === 'desc',
      'fa-sort': sortParam !== 'died',
    }),

    name: classNames('fas', {
      'fa-sort-up': sortParam === 'name' && orderParam !== 'desc',
      'fa-sort-down': sortParam === 'name' && orderParam === 'desc',
      'fa-sort': sortParam !== 'name',
    }),

    sex: classNames('fas', {
      'fa-sort-up': sortParam === 'sex' && orderParam !== 'desc',
      'fa-sort-down': sortParam === 'sex' && orderParam === 'desc',
      'fa-sort': sortParam !== 'sex',
    }),

    born: classNames('fas', {
      'fa-sort-up': sortParam === 'born' && orderParam !== 'desc',
      'fa-sort-down': sortParam === 'born' && orderParam === 'desc',
      'fa-sort': sortParam !== 'born',
    }),
  };

  return sortClasses;
}
