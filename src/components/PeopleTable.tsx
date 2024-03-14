/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { getPreparedPeople } from '../utils/getPreparedPeople';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const descending = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const filterField = searchParams.get('sex');

  const preparedPeople = getPreparedPeople(
    people,
    { sortField, descending },
    { filterField, centuries, query },
  );

  const setSortField = useCallback(
    (typeSort: string) => {
      if (typeSort !== sortField) {
        return { sort: `${typeSort}`, order: null };
      }

      if (sortField && !descending) {
        return { sort: `${typeSort}`, order: 'desc' };
      }

      if (sortField && descending) {
        return { sort: null, order: null };
      }

      return { sort: `${typeSort}`, order: null };
    },
    [descending, sortField],
  );

  if (preparedPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={setSortField('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== 'name',
                      'fa-sort-up': sortField === 'name' && !descending,
                      'fa-sort-down': sortField === 'name' && descending,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={setSortField('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== 'sex',
                      'fa-sort-up': sortField === 'sex' && !descending,
                      'fa-sort-down': sortField === 'sex' && descending,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={setSortField('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== 'born',
                      'fa-sort-up': sortField === 'born' && !descending,
                      'fa-sort-down': sortField === 'born' && descending,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={setSortField('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== 'died',
                      'fa-sort-up': sortField === 'died' && !descending,
                      'fa-sort-down': sortField === 'died' && descending,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
});
