import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortButton: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const isCurrentSelected = sortParam === field;

  const params = {
    sort: !isCurrentSelected || !orderParam ? field : null,
    order: isCurrentSelected && !orderParam ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': !isCurrentSelected,
            'fa-sort-up': isCurrentSelected && !orderParam,
            'fa-sort-down': isCurrentSelected && orderParam,
          })}
        />
      </span>
    </SearchLink>
  );
};
