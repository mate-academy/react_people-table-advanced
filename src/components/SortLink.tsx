import { FC, useCallback } from 'react';
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

  const handleSortParams = useCallback(
    () => {
      const newSearchParams = { sort: sortBy, order: currentOrder };

      if (sortBy !== currentSort && currentOrder) {
        newSearchParams.order = null;

        return getSearchWith(searchParams, newSearchParams);
      }

      if (currentOrder) {
        return getSearchWith(searchParams, { sort: null, order: null });
      }

      if (currentSort === sortBy) {
        return getSearchWith(searchParams, { order: 'desc' });
      }

      return getSearchWith(searchParams, newSearchParams);
    }, [searchParams],
  );

  return (
    <Link to={{ search: handleSortParams() }}>
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
