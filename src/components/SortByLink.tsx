import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  field: string;
};

export const SortByLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const title = field[0].toUpperCase() + field.slice(1);
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';
  const isCurrentSort = sortField === field;

  const params = {
    sort: (isCurrentSort && isReversed) ? null : field,
    order: (isCurrentSort && !isReversed) ? 'desc' : null,
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink field={params}>
          <span className="icon">
            <i className={classNames(
              'fas',
              { 'fa-sort': !isCurrentSort },
              { 'fa-sort-up': isCurrentSort && !isReversed },
              { 'fa-sort-down': isCurrentSort && isReversed },
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>

  );
};
