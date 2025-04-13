/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  visiblePeople: Person[];
  currentPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  currentPeople,
}) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

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
              <SearchLink
                params={{
                  sort: sortBy === 'name' && orderBy ? null : 'name',
                  order: !orderBy && sortBy === 'name' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== 'name',
                      'fa-sort-up': sortBy === 'name' && !orderBy,
                      'fa-sort-down': sortBy === 'name' && orderBy,
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
                params={{
                  sort: sortBy === 'sex' && orderBy ? null : 'sex',
                  order: !orderBy && sortBy === 'sex' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== 'sex',
                      'fa-sort-up': sortBy === 'sex' && !orderBy,
                      'fa-sort-down': sortBy === 'sex' && orderBy,
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
                params={{
                  sort: sortBy === 'born' && orderBy ? null : 'born',
                  order: !orderBy && sortBy === 'born' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== 'born',
                      'fa-sort-up': sortBy === 'born' && !orderBy,
                      'fa-sort-down': sortBy === 'born' && orderBy,
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
                params={{
                  sort: sortBy === 'died' && orderBy ? null : 'died',
                  order: !orderBy && sortBy === 'died' ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortBy !== 'died',
                      'fa-sort-up': sortBy === 'died' && !orderBy,
                      'fa-sort-down': sortBy === 'died' && orderBy,
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
        {visiblePeople?.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={currentPeople}
          />
        ))}
      </tbody>
    </table>
  );
};
