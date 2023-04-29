import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  sortBy: SortBy,
  isSortingNow: boolean,
};

export const SortLink: FC<Props> = ({ sortBy, isSortingNow }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSortParams = (type: SortBy) => {
    const newSearchParams = { sort: type, order: currentOrder };

    if (type !== currentSort && currentOrder) {
      newSearchParams.order = null;

      return getSearchWith(searchParams, newSearchParams);
    }

    if (currentOrder) {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    if (currentSort === type) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, newSearchParams);
  };

  return (
    <Link to={{ search: handleSortParams(sortBy) }}>
      <span className="icon">
        <i className={cn(
          'fas',
          'fa-sort',
          { 'fa-sort-up': isSortingNow && !currentOrder },
          { 'fa-sort-down': isSortingNow && currentOrder },
        )}
        />
      </span>
    </Link>
  );
};
