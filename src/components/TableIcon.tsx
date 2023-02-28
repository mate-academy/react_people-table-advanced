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

    return (
      <span className="icon">
        <i className={cn('fas', {
          'fa-sort-up': (currentSort === sort) && !currentOrder,
          'fa-sort-down': (currentSort === sort) && currentOrder,
          'fa-sort': currentSort !== sort,
        })}
        />
      </span>
    );
  },
);
