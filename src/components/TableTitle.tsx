import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SortType, Order } from '../types/FilterParams';

type Props = {
  title: string;
};

export const TableTitle: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortType;
  const order = searchParams.get('order') as Order;

  const setParams = (sortType: string) => {
    const firstClick = sort !== sortType;
    const secondClick = sort === sortType && order === Order.Asc;

    if (firstClick) {
      return {
        sort: sortType,
        order: Order.Asc,
      };
    }

    if (secondClick) {
      return {
        sort: sortType,
        order: Order.Desc,
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const lowerTitle = title.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={setParams(lowerTitle)}>
          <span className="icon">
            <i
              className={cn('fas', {
                'fa-sort': sort !== lowerTitle,
                'fa-sort-up': sort === lowerTitle && order === null,
                'fa-sort-down': sort === lowerTitle && order === Order.Desc,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
