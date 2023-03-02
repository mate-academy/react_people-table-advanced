import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  const sortParam = field.toLowerCase();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: sortParam === sortField && isReversed ? null : sortParam,
    order: sortParam === sortField && !isReversed ? 'desc' : null,
  };

  return (
    <th key={field}>
      <span className="is-flex is-flex-wrap-nowrap capitalize">
        {field}
        <SearchLink params={params}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': sortField !== sortParam,
                'fa-sort-up': sortField === sortParam && !isReversed,
                'fa-sort-down': sortField === sortParam && isReversed,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
