import React from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type SortTableProps = {
  type: string,
  sort: string,
  order: string,
};

export const SortTable: React.FC<SortTableProps> = ({
  type,
  sort,
  order,
}) => {
  const sortBy = (newSortType: string): SearchParams => {
    let sortParams: SearchParams = {};
    const firstClick = newSortType !== sort;
    const secondClick = newSortType === sort && order !== 'desc';
    const thirdClick = newSortType === sort && order === 'desc';

    if (firstClick) {
      sortParams = {
        sort: newSortType,
      };
    }

    if (secondClick) {
      sortParams = {
        order: 'desc',
      };
    }

    if (thirdClick) {
      sortParams = {
        sort: null,
        order: null,
      };
    }

    return sortParams;
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {type}
        <SearchLink params={sortBy(type)}>
          <span className="icon">
            <i className={cn('fas', {
              'fa-sort': sort !== type,
              'fa-sort-down': sort === type && order !== 'desc',
              'fa-sort-up': sort === type && order === 'desc',
            })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
