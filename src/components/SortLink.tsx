import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface SortLinkPropsType {
  sortBy: string,
}

export const SortLink: React.FC<SortLinkPropsType> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: (sortBy === sortParam && isReversed)
      ? null
      : sortBy,
    order: (sortBy === sortParam && !isReversed)
      ? 'desc'
      : null,
  };

  return (
    <SearchLink params={params}>
      <span>
        <i className={classNames(
          'fas',
          {
            'fa-sort': sortBy !== sortParam,
            'fa-sort-up': sortBy === sortParam && !isReversed,
            'fa-sort-down': sortBy === sortParam && isReversed,
          },
        )}
        />
      </span>
    </SearchLink>
  );
};
