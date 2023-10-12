import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { TABLE_COLUMNS } from '../utils/constants';

export const TableHeader: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const isOrderDescending = order === 'desc';

  const setOrder = (column: string) => {
    if (sort === column) {
      return order ? null : 'desc';
    }

    return null;
  };

  const setSortField = (column: string) => {
    if (sort === column && isOrderDescending) {
      return null;
    }

    return column;
  };

  return (
    <thead>
      <tr>
        {TABLE_COLUMNS.map(column => {
          const lowerColumn = column.toLowerCase();
          const isColumnSorting = sort === lowerColumn;

          return (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink
                  params={{
                    sort: setSortField(lowerColumn) || null,
                    order: setOrder(lowerColumn) || null,
                  }}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': !isColumnSorting,
                      'fa-sort-up': isColumnSorting && !isOrderDescending,
                      'fa-sort-down': isColumnSorting && isOrderDescending,
                    })}
                    />
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
