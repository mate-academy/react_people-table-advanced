import React from 'react';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonType } from '../types';
import { Person } from './Person';

interface Props {
  people: PersonType[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortOptions = (newSort: string) => {
    if (newSort !== currentSort) {
      return { sort: newSort, order: null };
    }

    if (newSort === currentSort && !order) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortClass = (sort: string) => {
    return classNames('fas', {
      'fa-sort': sort !== currentSort,
      'fa-sort-up': sort === currentSort && !order,
      'fa-sort-down': sort === currentSort && !!order,
    });
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
              <SearchLink params={{ ...sortOptions('name') }}>
                <span className="icon">
                  <i className={sortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...sortOptions('sex') }}>
                <span className="icon">
                  <i className={sortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...sortOptions('born') }}>
                <span className="icon">
                  <i className={sortClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Person
            key={person.slug}
            people={people}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
