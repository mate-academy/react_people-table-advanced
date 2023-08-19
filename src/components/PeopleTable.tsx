import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { PeopleLink } from './PeopleLink';
import { sortOptions } from '../utils/DataOptions';
import { getSortParams } from '../services/GetSortParams';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPerson = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  const sortBy = (newSortType: string) => {
    const sortParams = getSortParams(newSortType, order);

    return getSearchWith(searchParams, sortParams);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOptions.map(option => (
            <th key={option.title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {option.title}
                <Link
                  to={{
                    search: sortBy(option.value),
                  }}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== option.value,
                      'fa-sort-up': sort === option.value && order !== 'desc',
                      'fa-sort-down': sort === option.value && order === 'desc',
                    })}
                    />
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
        {people.map(person => (
          <PeopleLink
            key={person.slug}
            person={person}
            onFindPerson={findPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
