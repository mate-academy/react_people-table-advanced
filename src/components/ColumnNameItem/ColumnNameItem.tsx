import React from 'react';
import { useSearchParams } from 'react-router-dom';

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

  return (
    <th key={value}>
      <span className="is-flex is-flex-wrap-nowrap">
        {value}
        <SearchLink
          params={getSortParams(lowerCasedValue)}
        >
          <span className="icon">
            {lowerCasedValue !== sort && (<i className="fas fa-sort" />)}
            {lowerCasedValue === sort && !order && (
              <i className="fas fa-sort-up" />
            )}
            {order && lowerCasedValue === sort && (
              <i className="fas fa-sort-down" />
            )}
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
