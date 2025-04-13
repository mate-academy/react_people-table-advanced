/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  visiblePeople: Person[];
  currentPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  currentPeople,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

  function handleSort(columnName: string) {
    const params = new URLSearchParams(searchParams);

    params.delete('order');
    params.delete('sort');

    if (sortBy === columnName && orderBy === 'desc') {
      setSearchParams(params);

      return;
    }

    if (sortBy === columnName) {
      params.set('order', 'desc');
    }

    params.set('sort', columnName);
    setSearchParams(params);
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
              <a
                onClick={() => {
                  handleSort('name');
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
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={() => {
                  handleSort('sex');
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
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={() => {
                  handleSort('born');
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
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={() => {
                  handleSort('died');
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
              </a>
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
