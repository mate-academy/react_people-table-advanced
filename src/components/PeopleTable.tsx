/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort' || null);
  const order = searchParams.get('order' || null);

  const sortPeopleBy = useCallback(() => {
    const sortedPeople = [...peoples];

    if (sort) {
      sortedPeople.sort((person1, person2) => {
        const people1 = person1[sort as keyof Person];
        const people2 = person2[sort as keyof Person];

        if (typeof people1 === 'string' && typeof people2 === 'string') {
          return order === 'desc'
            ? people2.localeCompare(people1)
            : people1.localeCompare(people2);
        }

        if (typeof people1 === 'number' && typeof people2 === 'number') {
          return order === 'desc' ? people2 - people1 : people1 - people2;
        }

        return 0;
      });
    }

    return sortedPeople;
  }, [sort, order, peoples]);

  const visiblePeoples = useMemo(() => sortPeopleBy(), [sortPeopleBy]);

  const checkName = useCallback(
    (params: string) => {
      if (sort === params && !order) {
        setSearchParams(
          getSearchWith(searchParams, { sort: params, order: 'desc' }),
        );
      } else if (sort === params && order === 'desc') {
        setSearchParams(
          getSearchWith(searchParams, { sort: null, order: null }),
        );
      } else {
        setSearchParams(
          getSearchWith(searchParams, { sort: params, order: null }),
        );
      }
    },
    [searchParams, order, setSearchParams, sort],
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
              <a onClick={() => checkName('name')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === 'name' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => checkName('sex')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === 'sex' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => checkName('born')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === 'born' ? (order === 'desc' ? '-down' : '-up') : ''}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => checkName('died')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === 'died' ? (order === 'desc' ? '-down' : '-up') : ''}`}
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
        {visiblePeoples.map(person => (
          <PersonInfo person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
