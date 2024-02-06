/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const categories = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function handleClickOnCategory(category: string) {
    if (!sort || sort !== category) {
      return { sort: category, order: null };
    }

    if (!order) {
      return { sort: category, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {categories.map(category => (
            <th key={category}>
              <span className="is-flex is-flex-wrap-nowrap">
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <SearchLink params={handleClickOnCategory(category)}>
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== category,
                      'fa-sort-up': sort === category && !order,
                      'fa-sort-down': sort === category && order,
                    })}
                    />
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
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
          />
        ))}
      </tbody>
    </table>
  );
};
