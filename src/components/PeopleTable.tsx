import { Link, useSearchParams } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Person, Sorted } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSortParams = useCallback(
    (text: string) => {
      let param = '';

      if (sort !== text) {
        param = getSearchWith(searchParams, { sort: text, order: null });
      } else if (sort === text && !order) {
        param = getSearchWith(searchParams, { order: 'desc' });
      } else if (sort && order) {
        param = getSearchWith(searchParams, { order: null, sort: null });
      }

      return param;
    },
    [order, searchParams, sort],
  );

  const getClassLink = useCallback(
    (columnName: Sorted) => {
      if (sort === columnName && !order) {
        return 'fas fa-sort-up';
      }

      if (sort === columnName && order) {
        return 'fas fa-sort-down';
      }

      return 'fas fa-sort';
    },
    [order, sort],
  );

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
              <Link to={{ search: handleSortParams(Sorted.NAME) }}>
                <span className="icon">
                  <i className={getClassLink(Sorted.NAME)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSortParams(Sorted.SEX) }}>
                <span className="icon">
                  <i className={getClassLink(Sorted.SEX)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSortParams(Sorted.BORN) }}>
                <span className="icon">
                  <i className={getClassLink(Sorted.BORN)} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSortParams(Sorted.DIED) }}>
                <span className="icon">
                  <i className={getClassLink(Sorted.DIED)} />
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
          <PersonLink person={person} people={people} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
