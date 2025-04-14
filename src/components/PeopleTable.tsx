import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const getSortParams = (column: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const isSortedByThisColumn = currentSort === column;
    const isDesc = currentOrder === 'desc';

    if (!isSortedByThisColumn) {
      return { sort: column, order: null };
    }

    if (isSortedByThisColumn && !isDesc) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (column: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== column) {
      return 'fa-sort';
    }

    if (!currentOrder || currentOrder === 'asc') {
      return 'fa-sort-up';
    }

    if (currentOrder === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={classNames('fas', getSortIconClass(field))} />
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
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
