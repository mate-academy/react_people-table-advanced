import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const selectedSortParam = searchParams.get('sort') || '';
  const orderReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: field === selectedSortParam && orderReversed ? null : field,
    order: field === selectedSortParam && !orderReversed ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': selectedSortParam !== field,
            'fa-sort-up': selectedSortParam === field && !orderReversed,
            'fa-sort-down': selectedSortParam === field && orderReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
