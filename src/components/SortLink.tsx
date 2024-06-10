import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const isSortField = field === sortField;

  const params = {
    sort: isSortField && isReversed ? null : field,
    order: isSortField && !isReversed ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': isSortField && !isReversed,
            'fa-sort-down': isSortField && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
