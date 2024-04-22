import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PersonLink } from './PersonLink';
import { StateContext } from '../Store';
import { Link, useSearchParams } from 'react-router-dom';
import { findCentury } from '../utils/findCentuary';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { checkSorts } from '../utils/checkSorts';
import { Person } from '../types';
import { QueryParams } from '../types/QueryParams';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(StateContext);

  const [preparedPeople, setPeparedPeople] = useState(people);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get(QueryParams.Sex) || '';
  const query = searchParams.get(QueryParams.Query) || '';
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  const centuries = useMemo(
    () => searchParams.getAll(QueryParams.Centuries) || [],
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
    sortByText(QueryParams.Name);

    sortByText(QueryParams.Sex);

    sortByNumber(QueryParams.Born);
    sortByNumber(QueryParams.Died);
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
                        checkSorts(order, sort, QueryParams.Name),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== QueryParams.Name,
                          'fa-sort-down': sort === QueryParams.Name,
                          'fa-sort-up': sort === QueryParams.Name && order,
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
                        checkSorts(order, sort, QueryParams.Sex),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== QueryParams.Sex,
                          'fa-sort-down': sort === QueryParams.Sex,
                          'fa-sort-up': sort === QueryParams.Sex && order,
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
                        checkSorts(order, sort, QueryParams.Born),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== QueryParams.Born,
                          'fa-sort-down': sort === QueryParams.Born,
                          'fa-sort-up': sort === QueryParams.Born && order,
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
                        checkSorts(order, sort, QueryParams.Died),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== QueryParams.Died,
                          'fa-sort-down': sort === QueryParams.Died,
                          'fa-sort-up': sort === QueryParams.Died && order,
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
