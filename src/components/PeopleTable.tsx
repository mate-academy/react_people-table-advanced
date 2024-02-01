/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

const tableColumns = ['name', 'sex', 'born', 'died'];

interface Props {
  people?: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortValue = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleNameDescending = (sortName: string) => {
    return sortValue === sortName && order === 'desc';
  };

  const getSortConfig = (sortName: string) => {
    if (!sortValue) {
      return {
        sort: sortName,
        order: null,
      };
    }

    if (sortValue && order) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortValue === sortName && !order) {
      return {
        sort: sortName,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.slice(0, 1).toUpperCase() + column.slice(1)}
                <SearchLink params={getSortConfig(column)}>
                  <span className="icon">
                    <i
                      className={cn(
                        'fas', {
                          'fa-sort': sortValue !== column,
                          'fa-sort-up': sortValue === column && !order,
                          'fa-sort-down': handleNameDescending(column),
                        },
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
        {people && people.map(person => (
          <PersonLink
            people={people}
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
