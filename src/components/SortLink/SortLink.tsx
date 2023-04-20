import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { updateSearchParams } from '../../utils/searchHelper';

type Props = {
  sort: keyof Person,
};

export const SortLink: React.FC<Props> = ({ sort }) => {
  const [searchParams] = useSearchParams();
  const isCurrentSortField = searchParams.get('sort') === sort;
  const isReversed = searchParams.get('order') === 'desc';

  return (
    <Link
      to={{
        search: updateSearchParams(
          searchParams,
          sort,
          isCurrentSortField,
          isReversed,
        ),
      }}
    >
      <span className="icon">
        <i
          className={classNames(
            'fas',
            { 'fa-sort': !isCurrentSortField },
            { 'fa-sort-up': isCurrentSortField && !isReversed },
            { 'fa-sort-down': isCurrentSortField && isReversed },
          )}
        />
      </span>
    </Link>
  );
};
