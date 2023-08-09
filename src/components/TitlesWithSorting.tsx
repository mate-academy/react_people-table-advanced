import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Order, Sort } from '../types/SortOptions';
import { SearchLink } from './SearchLink';

type Props = {
  title: string,
};

export const TitlesWithSorting: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as Sort;
  const order = searchParams.get('order') as Order;

  const toggleSort = (newSortOption: string) => {
    const firstClick = newSortOption !== sort;
    const secondClick = newSortOption === sort && order === Order.Asc;

    if (firstClick) {
      return {
        sort: newSortOption,
        order: Order.Asc,
      };
    }

    if (secondClick) {
      return {
        sort: newSortOption,
        order: Order.Desc,
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const normalizedTitle = title.toLowerCase();

  const iconClassNames = classNames('fas', {
    'fa-sort': sort !== normalizedTitle,
    'fa-sort-down': sort === normalizedTitle && order === Order.Asc,
    'fa-sort-up': sort === normalizedTitle && order === Order.Desc,
  });

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={toggleSort(normalizedTitle)}>
          <span className="icon">
            <i className={iconClassNames} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
