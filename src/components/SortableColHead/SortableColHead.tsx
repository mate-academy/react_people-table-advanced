import React from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  sortField: string;
  onSort: (sortField: string) => void;
  searchParams: URLSearchParams;
}

export const SortableColHead: React.FC<Props> = ({
  title,
  sortField,
  onSort,
  searchParams,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onSort(sortField);
  };

  const currentSortField = searchParams?.get('sort');
  const currentOrder = searchParams?.get('order') || 'asc';

  const isCurrentSort = currentSortField === sortField;

  const newSearchParams = new URLSearchParams(searchParams.toString());

  if (!isCurrentSort) {
    newSearchParams.set('sort', sortField);
    newSearchParams.set('order', 'asc');
  } else if (currentOrder === 'asc') {
    newSearchParams.set('order', 'desc');
  } else {
    newSearchParams.delete('sort');
    newSearchParams.delete('order');
  }

  const iconClassName = cn('fas', {
    'fa-sort-up': isCurrentSort && currentOrder === 'asc',
    'fa-sort-down': isCurrentSort && currentOrder === 'desc',
    'fa-sort': !isCurrentSort,
  });

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <a
          href={`#/people?${newSearchParams.toString()}`}
          onClick={handleClick}
        >
          <span className="icon">
            <i className={iconClassName} />
          </span>
        </a>
      </span>
    </th>
  );
};
