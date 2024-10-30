import React from 'react';

import { PersonRender } from './PersonRender';
import { EmptyTableMessage } from './EmptyTableMessage';

import { Person } from '../types';
import { Link } from 'react-router-dom';
import { useFilters } from '../hooks/useFilters';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

const SORT_ORDERS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleRender: React.FC<Props> = ({ people }) => {
  const { searchParams, order, sort } = useFilters();

  const handleSorting = (sortBy: string | null) => {
    const isSortSameAsArgument = (sort === sortBy) !== null;
    const lowerSortBy = sortBy ? sortBy.toLowerCase() : '';

    if (!sort) {
      return getSearchWith(searchParams, { sort: lowerSortBy });
    }

    if (sort && !order && isSortSameAsArgument) {
      return getSearchWith(searchParams, { sort: lowerSortBy, order: 'desc' });
    }

    if (sort && order && isSortSameAsArgument) {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    return '';
  };

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
