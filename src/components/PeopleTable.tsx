import React from 'react';
import classNames from 'classnames';

import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { InfoPerson } from './InfoPerson';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const TablePeople: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  const sortPeople = (category: string) => {
    if (order && sort === category) {
      return {
        sort: null,
        order: null,
      };
    }

    if (!order && sort === category) {
      return {
        sort: category,
        order: 'desc',
      };
    }

    return {
      sort: category,
      order: null,
    };
  };

  const findPeople = (name: string | null) => {
    return people.find(person => person.name === name);
  };

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
                params={sortPeople('name')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'name',
                    'fa-sort-up': sort === 'name' && order !== 'desc',
                    'fa-sort-down': sort === 'name' && order === 'desc',
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
                params={sortPeople('sex')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'sex',
                    'fa-sort-up': sort === 'sex' && order !== 'desc',
                    'fa-sort-down': sort === 'sex' && order === 'desc',
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
                params={sortPeople('born')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'born',
                    'fa-sort-up': sort === 'born' && order !== 'desc',
                    'fa-sort-down': sort === 'born' && order === 'desc',
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
                params={sortPeople('died')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== 'died',
                    'fa-sort-up': sort === 'died' && order !== 'desc',
                    'fa-sort-down': sort === 'died' && order === 'desc',
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
        {people.map(person => (
          <InfoPerson
            key={person.slug}
            person={person}
            ifPersonPind={findPeople}
          />
        ))}
      </tbody>
    </table>
  );
};
