import React, { useMemo } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/filterPeople';
import { sortByKey } from '../utils/sortByKey';
import { SearchLink } from './SearchLink';
type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const filteredPeople = useMemo(() => {
    const filtered = filterPeople(searchParams, people);

    return sortByKey(filtered, searchParams);
  }, [searchParams, people]);

  return filteredPeople.length === 0 ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={
                  searchParams.get('sort') !== 'name'
                    ? { sort: 'name', order: null }
                    : searchParams.get('order') !== 'desc'
                      ? { sort: 'name', order: 'desc' }
                      : { sort: null, order: null }
                }
              >
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort': searchParams.get('sort') !== 'name',
                      'fa-sort-up':
                        searchParams.get('sort') === 'name' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'name' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={
                  searchParams.get('sort') !== 'sex'
                    ? { sort: 'sex', order: null }
                    : searchParams.get('order') !== 'desc'
                      ? { sort: 'sex', order: 'desc' }
                      : { sort: null, order: null }
                }
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'sex',
                      'fa-sort-up':
                        searchParams.get('sort') === 'sex' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'sex' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={
                  searchParams.get('sort') !== 'born'
                    ? { sort: 'born', order: null }
                    : searchParams.get('order') !== 'desc'
                      ? { sort: 'born', order: 'desc' }
                      : { sort: null, order: null }
                }
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'born',
                      'fa-sort-up':
                        searchParams.get('sort') === 'born' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'born' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={
                  searchParams.get('sort') !== 'died'
                    ? { sort: 'died', order: null }
                    : searchParams.get('order') !== 'desc'
                      ? { sort: 'died', order: 'desc' }
                      : { sort: null, order: null }
                }
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'died',
                      'fa-sort-up':
                        searchParams.get('sort') === 'died' &&
                        searchParams.get('order') !== 'desc',
                      'fa-sort-down':
                        searchParams.get('sort') === 'died' &&
                        searchParams.get('order') === 'desc',
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
        {filteredPeople.map((person: Person) => {
          return (
            <PersonLink key={person.name} person={person} people={people} />
          );
        })}
      </tbody>
    </table>
  );
};
