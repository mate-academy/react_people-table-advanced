import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

function getNextSortParams(
  currentSort: string | null,
  currentOrder: string | null,
  field: string,
) {
  let nextSort: string | null;
  let nextOrder: string | null;

  if (currentSort !== field) {
    // 1-й клік по цьому field
    // або був інший sort (name → sex)
    // або взагалі не було сорту
    nextSort = field;
    nextOrder = null;
  } else if (currentSort === field && currentOrder === null) {
    // 2-й клік по тому ж field → додаємо order=desc
    nextSort = field;
    nextOrder = 'desc';
  } else {
    // 3-й клік по тому ж field (було desc) → скидаємо
    nextSort = null;
    nextOrder = null;
  }

  return { nextSort, nextOrder };
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const name = getNextSortParams(sort, order, 'name');
  const sex = getNextSortParams(sort, order, 'sex');
  const born = getNextSortParams(sort, order, 'born');
  const died = getNextSortParams(sort, order, 'died');

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
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: name.nextSort,
                    order: name.nextOrder,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: sex.nextSort,
                    order: sex.nextOrder,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: born.nextSort,
                    order: born.nextOrder,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: died.nextSort,
                    order: died.nextOrder,
                  }),
                }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink people={people} person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
