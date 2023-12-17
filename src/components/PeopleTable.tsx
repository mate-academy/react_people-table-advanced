import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonСell } from './PersonSell';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState(people);

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const setSortParams = (param: string) => {
    if (sort !== param) {
      return getSearchWith(
        searchParams,
        { sort: param, order: null },
      );
    }

    if (sort === param && !order) {
      return getSearchWith(
        searchParams,
        { sort: param, order: 'desc' },
      );
    }

    return getSearchWith(
      searchParams,
      { sort: null, order: null },
    );
  };

  useEffect(() => {
    switch (sort) {
      case 'name':
      case 'sex':
        if (!order) {
          setSortedPeople(people
            .sort((p1, p2) => p1[sort].localeCompare(p2[sort])));
        } else {
          setSortedPeople(people
            .sort((p1, p2) => p2[sort].localeCompare(p1[sort])));
        }

        break;

      case 'born':
      case 'died':
        if (!order) {
          setSortedPeople(people
            .sort((p1, p2) => p1[sort] - p2[sort]));
        } else {
          setSortedPeople(people
            .sort((p1, p2) => p2[sort] - p1[sort]));
        }

        break;

      default: setSortedPeople(people);
    }
  }, [people, setSortedPeople, sort, order]);

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
              <Link to={{ search: setSortParams('name') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': (sort !== 'name') },
                      { 'fa-sort-up': (sort === 'name' && !order) },
                      { 'fa-sort-down': (sort === 'name' && order) },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: setSortParams('sex') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': (sort !== 'sex') },
                      { 'fa-sort-up': (sort === 'sex' && !order) },
                      { 'fa-sort-down': (sort === 'sex' && order) },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: setSortParams('born') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': (sort !== 'born') },
                      { 'fa-sort-up': (sort === 'born' && !order) },
                      { 'fa-sort-down': (sort === 'born' && order) },
                    )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: setSortParams('died') }}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': (sort !== 'died') },
                      { 'fa-sort-up': (sort === 'died' && !order) },
                      { 'fa-sort-down': (sort === 'died' && order) },
                    )}
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
        {sortedPeople.map(person => {
          return <PersonСell person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
