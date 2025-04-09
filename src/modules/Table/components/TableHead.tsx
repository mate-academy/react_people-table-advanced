import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchNames } from '../../../utils';
import { SearchLink } from '../../Shared';

const sortColumns = ['Name', 'Sex', 'Born', 'Died'];

export const TableHead: React.FC = () => {
  const [searchParams] = useSearchParams();

  const activeSort = searchParams.get(SearchNames.Sort) || SearchNames.None;
  const activeOrder = searchParams.get(SearchNames.Order) || SearchNames.None;

  const getSortParams = (newSort: string) => {
    if (activeSort !== newSort) {
      return { sort: newSort, order: null };
    }

    if (!activeOrder) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (newSort: string) => {
    if (activeSort !== newSort) {
      return 'fa-sort';
    }

    return activeOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <thead>
      <tr>
        {sortColumns.map(sort => {
          const value = sort.toLowerCase();

          return (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sort}
                <SearchLink params={getSortParams(value)}>
                  <span className="icon">
                    <i className={`fas ${getSortIcon(value)}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
          );
        })}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
