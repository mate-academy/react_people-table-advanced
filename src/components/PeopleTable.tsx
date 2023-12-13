import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
export type PeopleTableProps = {
  filteredPeople: Person[]
  people: Person[]
};

export const PeopleTable = ({ filteredPeople, people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState<string | null>(searchParams.get('sort'));
  const [order, setOrder] = useState<string | null>(searchParams.get('order'));

  const handleSort = (sortBy: string) => {
    if (sort === sortBy) {
      if (order === 'desc') {
        setSort(null);
        setOrder(null);
      } else {
        setOrder('desc');
      }
    } else {
      setSort(sortBy);
      setOrder(null);
    }
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
              <Link
                to={{
                  search: getSearchWith(searchParams,
                    {
                      // eslint-disable-next-line no-nested-ternary
                      sort: sort !== 'name' ? 'name' : order === 'desc'
                        ? null : 'name',
                      order: sort === 'name' && order !== 'desc'
                        ? 'desc' : null,
                    }),
                }}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    { 'fa-sort': sort !== 'name' },
                    { 'fa-sort-up': sort === 'name' && !order },
                    { 'fa-sort-down': sort === 'name' && order })}
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
                  search: getSearchWith(searchParams,
                    {
                      // eslint-disable-next-line no-nested-ternary
                      sort: sort !== 'sex' ? 'sex' : order === 'desc'
                        ? null : 'sex',
                      order: sort === 'sex' && order !== 'desc'
                        ? 'desc' : null,
                    }),
                }}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    { 'fa-sort': sort !== 'sex' },
                    { 'fa-sort-up': sort === 'sex' && !order },
                    { 'fa-sort-down': sort === 'sex' && order })}
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
                  search: getSearchWith(searchParams,
                    {
                      // eslint-disable-next-line no-nested-ternary
                      sort: sort !== 'born' ? 'born' : order === 'desc'
                        ? null : 'born',
                      order: sort === 'born' && order !== 'desc'
                        ? 'desc' : null,
                    }),
                }}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    { 'fa-sort': sort !== 'born' },
                    { 'fa-sort-up': sort === 'born' && !order },
                    { 'fa-sort-down': sort === 'born' && order })}
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
                  search: getSearchWith(searchParams,
                    {
                      // eslint-disable-next-line no-nested-ternary
                      sort: sort !== 'died' ? 'died' : order === 'desc'
                        ? null : 'died',
                      order: sort === 'died' && order !== 'desc'
                        ? 'desc' : null,
                    }),
                }}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={classNames('fas',
                    { 'fa-sort': sort !== 'died' },
                    { 'fa-sort-up': sort === 'died' && !order },
                    { 'fa-sort-down': sort === 'died' && order })}
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
        {filteredPeople.map((person) => (
          <PersonLink
            person={person}
            people={people}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
