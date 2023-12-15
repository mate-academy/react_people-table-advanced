import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  sortField: string;
};

export const SortLink: React.FC<Props> = ({ sortField }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const orderBy = searchParams.get('order');

  const params = {
    sort: (sortBy === sortField && orderBy) ? null : sortField,
    order: (sortBy === sortField && !orderBy) ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className={cn('fas', {
          'fa-sort': sortBy !== sortField,
          'fa-sort-up': sortBy === sortField && !orderBy,
          'fa-sort-down': sortBy === sortField && orderBy,
        })}
        />
      </span>
    </SearchLink>
  );
};
