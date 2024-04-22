import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PersonLink } from './PersonLink';
import { StateContext } from '../Store';
import { Link, useSearchParams } from 'react-router-dom';
import { findCentury } from '../utils/findCentuary';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { checkSorts } from '../utils/checkSorts';
import { Person } from '../types';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(StateContext);

  const [preparedPeople, setPeparedPeople] = useState(people);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const sortByText = useCallback(
    (field: keyof Person) => {
      if (sort === field && !order) {
        setPeparedPeople(prevState =>
          [...prevState].sort(
            (a, b) =>
              (a[field] as string)?.localeCompare(b[field] as string) ?? 0,
          ),
        );
      } else if (sort === field && order) {
        setPeparedPeople(prevState =>
          [...prevState].sort(
            (a, b) =>
              (b[field] as string)?.localeCompare(a[field] as string) ?? 0,
          ),
        );
      }
    },
    [order, sort],
  );

  const sortByNumber = useCallback(
    (field: keyof Person) => {
      if (sort === field && !order) {
        setPeparedPeople(prevState =>
          [...prevState].sort(
            (a, b) => (a[field] as number) - (b[field] as number),
          ),
        );
      } else if (sort === field && order) {
        setPeparedPeople(prevState =>
          [...prevState].sort(
            (a, b) => (b[field] as number) - (a[field] as number),
          ),
        );
      }
    },
    [order, sort],
  );

  useEffect(() => {
    let filteredPeople = people;

    if (sex === 'f') {
      filteredPeople = filteredPeople.filter(person => person.sex === 'f');
    } else if (sex === 'm') {
      filteredPeople = filteredPeople.filter(person => person.sex === 'm');
    }

    if (!!centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const century = findCentury(person.born);

        return centuries.includes(`${century}`);
      });
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setPeparedPeople(filteredPeople);
  }, [sex, people, centuries, query]);

  useEffect(() => {
    sortByText('name');

    sortByText('sex');

    sortByNumber('born');
    sortByNumber('died');
  }, [sort, order, sortByNumber, sortByText]);

  return (
    <>
      {!preparedPeople.length ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
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
                      search: getSearchWith(
                        searchParams,
                        checkSorts(order, sort, 'name'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'name',
                          'fa-sort-down': sort === 'name',
                          'fa-sort-up': sort === 'name' && order,
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
                      search: getSearchWith(
                        searchParams,
                        checkSorts(order, sort, 'sex'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'sex',
                          'fa-sort-down': sort === 'sex',
                          'fa-sort-up': sort === 'sex' && order,
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
                      search: getSearchWith(
                        searchParams,
                        checkSorts(order, sort, 'born'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'born',
                          'fa-sort-down': sort === 'born',
                          'fa-sort-up': sort === 'born' && order,
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
                      search: getSearchWith(
                        searchParams,
                        checkSorts(order, sort, 'died'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== 'died',
                          'fa-sort-down': sort === 'died',
                          'fa-sort-up': sort === 'died' && order,
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
            {preparedPeople.map(person => (
              <PersonLink key={person.name} person={person} people={people} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
