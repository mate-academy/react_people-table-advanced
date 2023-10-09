import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { ColumnNames } from '../../types';

type Props = {
  value: keyof typeof ColumnNames,
};

export const ColumnName: React.FC<Props> = ({ value }) => {
  const [searchParams] = useSearchParams();

  const lowerCasedValue = value.toLowerCase();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (sortOption: string) => {
    if (sortOption !== sort) {
      return { sort: sortOption, order: null };
    }

    if (sort === sortOption && !order) {
      return { sort: sortOption, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const hasFaSort = lowerCasedValue !== sort;
  const hasFaSortUp = lowerCasedValue === sort && !order;
  const hasFaSortDown = order && lowerCasedValue === sort;

  return (
    <th key={value}>
      <span className="is-flex is-flex-wrap-nowrap">
        {value}
        <SearchLink
          params={getSortParams(lowerCasedValue)}
        >
          <span className="icon">
            <i className={cn(
              'fas',
              { 'fa-sort': hasFaSort },
              { 'fa-sort-up': hasFaSortUp },
              { 'fa-sort-down': hasFaSortDown },
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
