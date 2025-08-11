/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import { Person, OrderType } from '../types';
import { Persona } from './Persona';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
};
export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  setSearchParams,
}) => {
  const query = searchParams.get('query')?.toLowerCase() || '';

  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortPeople = useMemo(() => {
    function isPersonKey(key: string): key is keyof Person {
      return ['name', 'sex', 'born', 'died'].includes(key);
    }

    if (!isPersonKey(sort)) {
      return people;
    }

    const sortedPeople = [...people];

    sortedPeople.sort((a, b) => {
      const fieldA = a[sort];
      const fieldB = b[sort];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return order === OrderType.desc
          ? fieldB.localeCompare(fieldA)
          : fieldA.localeCompare(fieldB);
      }

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return order === OrderType.desc ? fieldB - fieldA : fieldA - fieldB;
      }

      return 0;
    });

    return sortedPeople;
  }, [sort, order, people]);

  const queryFilteredPeople = useMemo(() => {
    if (!query) {
      return sortPeople;
    }

    return sortPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, sortPeople]);

  const centuriesfilteredPeople = useMemo(() => {
    const centuries = searchParams.getAll('centuries') || [];

    if (!centuries || centuries.length === 0) {
      return queryFilteredPeople;
    }

    return queryFilteredPeople.filter(person => {
      if (!person.born) {
        return false;
      }

      const century = Math.ceil(person.born / 100);

      return centuries.includes(`${century}`);
    });
  }, [queryFilteredPeople, searchParams]);

  const sexfilteredPeople = useMemo(() => {
    if (!sex) {
      return centuriesfilteredPeople;
    }

    return centuriesfilteredPeople.filter(person => person.sex === sex);
  }, [sex, centuriesfilteredPeople]);

  function addSort(sortFilter: string) {
    const params = new URLSearchParams(searchParams);

    if (params.get('sort') !== sortFilter) {
      params.set('sort', sortFilter);
      params.delete('order');
    } else if (!params.get('order')) {
      params.set('order', OrderType.desc);
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  const getSortIcon = (currentSort: string) => {
    if (sort !== currentSort) {
      return '';
    }

    return order === OrderType.desc ? '-down' : '-up';
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
              <a onClick={() => addSort('name')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIcon('name')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => addSort('sex')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIcon('sex')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => addSort('born')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIcon('born')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => addSort('died')}>
                <span className="icon">
                  <i className={`fas fa-sort${getSortIcon('died')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sexfilteredPeople.length > 0 ? (
          sexfilteredPeople.map(person => (
            <Persona person={person} people={people} key={person.slug} />
          ))
        ) : (
          <tr>
            <p>There are no people matching the current search criteria</p>
          </tr>
        )}
      </tbody>
    </table>
  );
};
