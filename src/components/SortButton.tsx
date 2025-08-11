import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Order } from '../types/order';

type SortButtonProps = {
  field: string;
};

export const SortButton: React.FC<SortButtonProps> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === Order.DESC;

  const params = {
    sort: field === sortField && isReversed ? null : field,
    order: field === sortField && !isReversed ? Order.DESC : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': sortField === field && !isReversed,
            'fa-sort-down': sortField === field && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
