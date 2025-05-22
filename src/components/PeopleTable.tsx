import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import React, { useCallback, useEffect, useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  people: Person[];
};

type SortKey = 'name' | 'sex' | 'born' | 'died';

export const PeopleTableComponent = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const [filterPeople, setFilterPeople] = useState(people);
  const navigator = useNavigate();
  const location = useLocation();
  const sortSearch = searchParams.get('sort');
  const orderSearch = searchParams.get('order');

  // #region functions

  const getIconClass = (value: string) => {
    if (sortSearch === value) {
      return orderSearch === 'desc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  const toggleSort = useCallback(
    (value: string) => {
      let newSearch = getSearchWith(searchParams, {});

      if (sortSearch === value) {
        if (!orderSearch) {
          newSearch = getSearchWith(searchParams, { order: 'desc' });
        } else {
          newSearch = getSearchWith(searchParams, { order: null, sort: null });
        }
      } else {
        newSearch = getSearchWith(searchParams, { sort: value, order: null });
      }

      return newSearch;
    },
    [sortSearch, orderSearch, searchParams],
  );

  const getPerson = useCallback(
    (name: string) => {
      const per = people.find(p => p.name === name);

      if (per) {
        navigator(`/people/${per.slug}`);
      }
    },
    [people, navigator],
  );

  const getCentury = useCallback((year: number): number => {
    return Math.ceil(year / 100);
  }, []);

  const applySearchParams = useCallback(() => {
    const query = searchParams.get('query')?.trim().toLowerCase() || '';
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort') as SortKey | null;
    const order = searchParams.get('order');

    let filtered = [...people];

    // Фільтрація
    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.some(
          century => String(getCentury(person.born)) === String(century),
        ),
      );
    }

    // Сортування
    if (sort) {
      filtered = filtered.sort((a, b) => {
        if (a[sort]! < b[sort]!) {
          return order === 'desc' ? 1 : -1;
        }

        if (a[sort]! > b[sort]!) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    setFilterPeople(filtered);
  }, [searchParams, people, getCentury]);

  useEffect(() => {
    applySearchParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, people, searchParams]);

  // #endregion
  if (!filterPeople.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people matching the current search criteria
      </p>
    );
  }

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
                  search: toggleSort('name'),
                  pathname: location.pathname,
                }}
              >
                <span className="icon">
                  <i className={getIconClass('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: toggleSort('sex'),
                  pathname: location.pathname,
                }}
              >
                <span className="icon">
                  <i className={getIconClass('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: toggleSort('born'),
                  pathname: location.pathname,
                }}
              >
                <span className="icon">
                  <i className={getIconClass('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: toggleSort('died'),
                  pathname: location.pathname,
                }}
              >
                <span className="icon">
                  <i className={getIconClass('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filterPeople.map(person => (
          <PersonLink key={person.slug} person={person} getPerson={getPerson} />
        ))}
      </tbody>
    </table>
  );
};

export const PeopleTable = React.memo(PeopleTableComponent);
PeopleTable.displayName = 'PeopleTable';
