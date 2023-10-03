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
        {tableColumns.map(column => (
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              {column}
              <SearchLink
                params={{
                  sort: setSortField(column.toLowerCase()) || null,
                  order: setOrder(column.toLowerCase()) || null,
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== column,
                    'fa-sort-up': sort === column && order !== 'desc',
                    'fa-sort-down': sort === column && order === 'desc',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
