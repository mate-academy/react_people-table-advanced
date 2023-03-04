import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

interface Props {
  sortBy: string;
}

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const title = sortBy[0].toUpperCase() + sortBy.slice(1);

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  const isCurrentSort = sortBy === sortField;

  const prepareSortData = () => {
    if (sortBy !== sortField) {
      return {
        sort: sortBy,
        order: null,
      };
    }

    if (!order) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const preparedSortData = prepareSortData();

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}

      <SearchLink
        params={preparedSortData}
      >
        <span className="icon">
          <i className={cn(
            'fas',
            {
              'fa-sort': !isCurrentSort,
              'fa-sort-up': isCurrentSort && !order,
              'fa-sort-down': isCurrentSort && order,
            },
          )}
          />
        </span>
      </SearchLink>
    </span>
  );
};
