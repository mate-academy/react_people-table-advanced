import classNames from 'classnames';

export const getLinkClass = (field: string, searchParams: URLSearchParams) => {
  const sortField = searchParams.get('sort');
  const isFieldSorted = sortField === field;
  const isDescending = searchParams.get('order') === 'desc';

  return classNames('fas', {
    'fa-sort': !isFieldSorted,
    'fa-sort-up': isFieldSorted && !isDescending,
    'fa-sort-down': isFieldSorted && isDescending,
  });
};
