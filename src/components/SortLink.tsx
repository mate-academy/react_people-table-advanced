import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const params = {
    sort: !orderParam || sortParam !== field ? field : null,
    order: sortParam === field && !orderParam ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortParam !== field,
            'fa-sort-up': sortParam === field && !orderParam,
            'fa-sort-down': sortParam === field && !orderParam,
          })}
        />
      </span>
    </SearchLink>
  );
};
