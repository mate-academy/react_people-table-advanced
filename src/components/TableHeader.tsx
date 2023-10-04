import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { tableColumns } from '../utils/constants';

export const TableHeader: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const setOrder = (column: string) => {
    if (sort === column) {
      return order ? null : 'desc';
    }

    return null;
  };

  const setSortField = (column: string) => {
    if (sort === column && order === 'desc') {
      return null;
    }

    return column;
  };

  return (
    <thead>
      <tr>
        {tableColumns.map(column => {
          const lowerColumn = column.toLowerCase();

          return (
            <th>
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
                      'fa-sort': sort !== lowerColumn,
                      'fa-sort-up': sort === lowerColumn && order !== 'desc',
                      'fa-sort-down': sort === lowerColumn && order === 'desc',
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
