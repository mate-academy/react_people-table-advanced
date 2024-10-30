import React from 'react';

import { PersonRender } from './PersonRender';
import { EmptyTableMessage } from './EmptyTableMessage';

import { Person } from '../types';
import { Link } from 'react-router-dom';
import { useFilters } from '../hooks/useFilters';

interface Props {
  people: Person[];
}

const SORT_ORDERS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleRender: React.FC<Props> = ({ people }) => {
  const { handleSorting } = useFilters();

  return (
    <>
      {people.length > 0 ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {SORT_ORDERS.map(sort_order => (
                <th key={sort_order}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {sort_order}
                    <Link
                      to={{
                        search: handleSorting(sort_order),
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </Link>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            <PersonRender people={people} />
          </tbody>
        </table>
      ) : (
        <EmptyTableMessage />
      )}
    </>
  );
};
