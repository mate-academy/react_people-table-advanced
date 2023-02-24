import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';

type Props = {
  sortBy: string,
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: (sortBy === sortParam && isReversed) ? null : sortBy,
    order: (sortBy === sortParam && !isReversed) ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': sortBy !== sortParam,
            'fa-sort-up': sortBy === sortParam && !isReversed,
            'fa-sort-down': sortBy === sortParam && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
