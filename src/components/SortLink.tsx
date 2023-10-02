import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';
import { SearchParams } from '../types/SearchParams';

type Props = {
  sortBy: string
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();

  const isReversed = searchParams.get(SearchParams.ORDER);
  const sortField = searchParams.get(SearchParams.SORT) || '';

  const params = {
    order: (sortBy === sortField && !isReversed) ? 'desc' : null,
    sort: (sortBy === sortField && isReversed) ? null : sortBy,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className={classNames(
          'fas',
          {
            'fa-sort': sortField !== sortBy,
            'fa-sort-up': sortField === sortBy && !isReversed,
            'fa-sort-down': sortField === sortBy && isReversed,
          },
        )}
        />
      </span>
    </SearchLink>
  );
};
