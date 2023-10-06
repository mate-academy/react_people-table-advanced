import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';

type OrderControlProps = {
  sort: string;
};

export const OrderControl = ({ sort }: OrderControlProps) => {
  const [searchParams] = useSearchParams();

  const handleOrder = () => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    let newSort: string | null = null;
    let newOrder: string | null = null;

    if (!currentSort) {
      newSort = sort;
    }

    if (currentSort === sort && !currentOrder) {
      newSort = sort;
      newOrder = 'desc';
    }

    return { sort: newSort, order: newOrder };
  };

  return (
    <SearchLink params={handleOrder()}>
      <span className="icon">
        <i className={cn('fas', {
          'fa-sort': true,
          'fa-sort-up': searchParams.get('sort') === sort
          && !searchParams.get('order'),
          'fa-sort-down': searchParams.get('sort') === sort
          && !!searchParams.get('order'),
        })}
        />
      </span>
    </SearchLink>
  );
};
