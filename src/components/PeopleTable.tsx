import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchParams, TableSortColumns } from '../types/SearchParams';
import { SearchLink } from './SearchLink';
import { REVERSED_ORDER } from '../utils/constants';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchParams.Sort) || '';
  const order = searchParams.get(SearchParams.Order) || '';

  const handleSortClick = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (!order && sort === column) {
      return { sort: column, order: REVERSED_ORDER };
    }

    return { order: null, sort: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableSortColumns).map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column[0].toUpperCase() + column.slice(1)}
                <SearchLink params={handleSortClick(column)}>
                  <span className="icon">
                    <i className={cn('fas fa-sort', {
                      'fa-sort-up': !order && sort === column,
                      'fa-sort-down': order && sort === column,
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

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
