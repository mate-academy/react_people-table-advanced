import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { getSearchWith } from '../utils/searchHelper';
import { sortOptions } from '../utils/data';

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
    let sortParams = {};
    const firstClick = newSortType !== sort;
    const secondClick = newSortType === sort && order !== 'desc';
    const thirdClick = newSortType === sort && order === 'desc';

    if (firstClick) {
      sortParams = {
        sort: newSortType,
      };
    }

    if (secondClick) {
      sortParams = {
        order: 'desc',
      };
    }

    if (thirdClick) {
      sortParams = {
        sort: null, order: null,
      };
    }

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
