import React from 'react';
import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  visiblePeople: Person[];
  peopleAll: Person[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople, peopleAll }) => {
  const TABLE_SORTABLE_HEADERS = ['Name', 'Sex', 'Born', 'Died'];

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (sortBy: string) => {
    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!order) {
      return { sort, order: 'desc' };
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
          {TABLE_SORTABLE_HEADERS.map(header => {
            const lowerHeader = header.toLowerCase();

            return (
              <th key={header}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <SearchLink params={getSortParams(header.toLowerCase())}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== lowerHeader,
                          'fa-sort-up': sort === lowerHeader && !order,
                          'fa-sort-down': sort === lowerHeader && !!order,
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

      <tbody>
        {visiblePeople.map(person => (
          <PeopleTableRow
            person={person}
            people={peopleAll}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
