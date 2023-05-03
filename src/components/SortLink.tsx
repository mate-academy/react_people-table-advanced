import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  sortBy: string,
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.get('order') === 'desc';

  return (
    <SearchLink
      params={{
        sort: (sortBy === sortField && order) ? null : sortBy,
        order: (sortBy === sortField && !order) ? 'desc' : null,
      }}
    >
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== sortBy,
            'fa-sort-up': sortField === sortBy && !order,
            'fa-sort-down': sortField === sortBy && order,
          })}
        />
      </span>
    </SearchLink>
  );
};
