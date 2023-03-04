import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getSearchWithSort } from '../utils/searchHelper';

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
        search: getSearchWithSort(
          searchParams,
          sort,
          isCurrentSortField,
          isReversed,
        ),
      }}
    >
      <span className="icon">
        <i
          className={cn(
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
