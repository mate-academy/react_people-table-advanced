import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const columns = ['name', 'sex', 'born', 'died'];

export const PeopleTableHead = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  function sortParams(
    currentSort: string | null,
    currentOrder: string | null,
    column: string,
  ) {
    if (currentSort !== column) {
      return { sort: column, order: null };
    }

    if (!currentOrder) {
      return { sort: null, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  return (
    <tr>
      {columns.map(column => (
        <th key={column}>
          <span className="is-flex is-flex-wrap-nowrap">
            {column[0].toUpperCase() + column.slice(1)}
            <SearchLink params={sortParams(sort, order, column)}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort-up': sort === column && !order,
                    'fa-sort-down': sort === column && order === 'desc',
                    'fa-sort': sort !== column,
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
  );
};
