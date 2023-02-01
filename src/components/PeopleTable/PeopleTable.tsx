import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PeopleTableRow } from '../PeopleTableRow';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import { tableColumns } from './tableColumns';

interface Props {
  people: Person[];
  sort: string | null;
  order: string | null;
}

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  sort,
  order,
}) => {
  const getSortParams = (sortBy: string): SearchParams => {
    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (sort === sortBy && !order) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map(column => (
            <th key={column.id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.title}

                <SearchLink
                  params={getSortParams(column.value)}
                >
                  <span className="icon">
                    <i
                      className={cn(
                        'fas',
                        { 'fa-sort': sort !== column.value },
                        { 'fa-sort-up': sort === column.value && !order },
                        { 'fa-sort-down': sort === column.value && order },
                      )}
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
          <PeopleTableRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
});
