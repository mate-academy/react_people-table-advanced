import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  sortBy: string;
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const isReversed = searchParams.get('order') === 'desc';
  const sortField = searchParams.get('sort') || '';

  const params = {
    order: (sortBy === sortField && !isReversed) ? 'desc' : null,
    sort: (sortBy === sortField && isReversed) ? null : sortBy,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={cn(
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
