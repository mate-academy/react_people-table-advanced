/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { MyContext } from './state';
import { Loader } from './Loader';
import { Error } from './error';
import { Person } from './person';
import { Person as PersonType } from '../types';
import { PeopleFilters } from './PeopleFilters';

export const People = () => {
  const { person, setPerson, error, setError, setIsLoading, isLoading } =
    useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [originalPeople, setOriginalPeople] = useState<PersonType[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPerson(fetchedPeople);
        setOriginalPeople(fetchedPeople);
      })
      .catch(() => {
        setError('Unable to load people: ');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const sortPeopleByField = (
    field: keyof PersonType,
    event: React.MouseEvent,
  ) => {
    event.preventDefault();

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (!sort || sort !== field) {
      const sortedPeople = [...person].sort((a, b) =>
        String(a[field]).localeCompare(String(b[field])),
      );

      setPerson(sortedPeople);
      setSearchParams({ sort: field });
    } else if (sort === field && !order) {
      const sortedPeople = [...person].sort((a, b) =>
        String(b[field]).localeCompare(String(a[field])),
      );

      setPerson(sortedPeople);
      setSearchParams({ sort: field, order: 'desc' });
    } else {
      setPerson(originalPeople);
      setSearchParams({});
    }
  };

  const getSortIcon = (field: string) => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (!sort || sort !== field) {
      return 'fas fa-sort';
    } else if (sort === field && !order) {
      return 'fas fa-sort-up';
    } else if (sort === field && order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <>
                  <Error />
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                </>
              ) : person.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <>
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
                              to="/people?sort=name"
                              onClick={e => sortPeopleByField('name', e)}
                            >
                              <span className="icon">
                                <i className={getSortIcon('name')} />
                              </span>
                            </Link>
                          </span>
                        </th>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Sex
                            <Link
                              to="/people?sort=sex"
                              onClick={e => sortPeopleByField('sex', e)}
                            >
                              <span className="icon">
                                <i className={getSortIcon('sex')} />
                              </span>
                            </Link>
                          </span>
                        </th>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Born
                            <Link
                              to="/people?sort=born"
                              onClick={e => sortPeopleByField('born', e)}
                            >
                              <span className="icon">
                                <i className={getSortIcon('born')} />
                              </span>
                            </Link>
                          </span>
                        </th>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Died
                            <Link
                              to="/people?sort=died"
                              onClick={e => sortPeopleByField('died', e)}
                            >
                              <span className="icon">
                                <i className={getSortIcon('died')} />
                              </span>
                            </Link>
                          </span>
                        </th>
                        <th>Mother</th>
                        <th>Father</th>
                      </tr>
                    </thead>

                    <tbody>
                      {person.map((pers: PersonType) => (
                        <Person key={pers.slug} pers={pers} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
