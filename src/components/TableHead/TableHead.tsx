import classNames from 'classnames';
import { sortOptions } from '../../utils/variables';
import { SearchLink } from '../SearchLink';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const TableHead: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const orderBy = searchParams.get('order');

  return (
    <tr>
      {Object.keys(sortOptions).map(sort => {
        const sortName = sort.toLowerCase();

        return (
          <th key={sort}>
            <span className="is-flex is-flex-wrap-nowrap">
              {sort}
              <SearchLink
                params={{
                  sort: sortBy !== sortName || !orderBy ? sortName : null,
                  order: sortBy === sortName && !orderBy ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': sortBy !== sortName,
                      'fa-sort-up': sortBy === sortName && !orderBy,
                      'fa-sort-down': orderBy && sortBy === sortName,
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
  );
};
