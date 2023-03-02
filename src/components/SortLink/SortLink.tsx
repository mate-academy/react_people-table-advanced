import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  sortBy: string,
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: (sortBy === sortValue && isReversed) ? null : sortBy,
    order: (sortBy === sortValue && !isReversed) ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortBy !== sortValue,
            'fa-sort-up': sortBy === sortValue && !isReversed,
            'fa-sort-down': sortBy === sortValue && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
