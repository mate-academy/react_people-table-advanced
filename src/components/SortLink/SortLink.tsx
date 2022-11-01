import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  column: string;
};

export const SortLink: React.FC<Props> = ({ column }) => {
  const [searchParams] = useSearchParams();

  const sortColumn = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const columnTitle = column.toLowerCase();
  const isReversed = sortOrder === 'desc';

  const sortParam = (columnTitle === sortColumn && isReversed)
    ? null
    : columnTitle;

  const orderParam = (columnTitle === sortColumn && !isReversed)
    ? 'desc'
    : null;

  const params = {
    sort: sortParam,
    order: orderParam,
  };

  return (
    <span
      className="
        is-flex
        is-flex-wrap-nowrap"
    >
      {column}

      <SearchLink
        params={params}
      >
        <span className="icon">
          <i
            className={classNames(
              'fas',
              {
                'fa-sort': sortColumn !== columnTitle,
                'fa-sort-up': sortColumn === columnTitle && !isReversed,
                'fa-sort-down': sortColumn === columnTitle && isReversed,
              },
            )}
          />
        </span>
      </SearchLink>
    </span>
  );
};
