import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  sortBy: string;
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const isReversed = searchParams.get('order') === 'desc';
  const sortField = searchParams.get('sort') || '';

  const isSortAsc = sortBy === sortField && !isReversed;
  const isSortDesc = sortBy === sortField && isReversed;
  const isUnsorted = sortField !== sortBy;

  const params = {
    order: isSortAsc ? 'desc' : null,
    sort: isSortDesc ? null : sortBy,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames(
            'fas',
            {
              'fa-sort': isUnsorted,
              'fa-sort-up': isSortAsc,
              'fa-sort-down': isSortDesc,
            },
          )}
        />
      </span>
    </SearchLink>
  );
};
