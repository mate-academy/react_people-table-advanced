import cn from 'classnames';
import React from 'react';

interface Props {
  searchParams: URLSearchParams,
  sort: string,
}

export const TableIcon: React.FC<Props> = React.memo(
  ({ searchParams, sort }) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    const isSortUp = (currentSort === sort) && !currentOrder;
    const isSortDown = (currentSort === sort) && currentOrder;
    const isNoSort = currentSort !== sort;

    return (
      <span className="icon">
        <i className={cn('fas', {
          'fa-sort-up': isSortUp,
          'fa-sort-down': isSortDown,
          'fa-sort': isNoSort,
        })}
        />
      </span>
    );
  },
);
