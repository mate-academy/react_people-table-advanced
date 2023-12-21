import React, { useEffect } from 'react';
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { client } from '../../utils/fetchClient';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleFilters } from '../PeopleFilters';
import { useTableContext } from '../Context';
import { SearchLink } from '../SearchLink/SearchLink';

export const PeoplePage: React.FC = () => {
  const {
    peoples,
    setPeoples,
    hasError,
    setHasError,
    isLoading,
    setIsLoading,
    currPeoples,
    searchParams,
    query,
    gender,
    centuries,
    setCurrPeoples,
    sortCurr,
    order,
  } = useTableContext();

  const necessaryPeople = currPeoples ?? peoples;

  const { slug } = useParams();

  const sortParams = (sortType: string) => {
    if (sortCurr !== sortType) {
      return { sort: sortType, order: null };
    }

    if (order) {
      return { sort: null, order: null };
    }

    return { sort: sortType, order: 'desc' };
  };

  useEffect(() => {
    setIsLoading(true);

    client.get('people.json')
      .then((response: unknown) => {
        setPeoples(response as Person[]);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredPeople = peoples;

    if (query !== '') {
      filteredPeople = filteredPeople.filter(person => {
        const normalizeQuery = query.toLowerCase();
        const normalizeName = person.name.toLowerCase();

        return (
          normalizeName.includes(normalizeQuery)
          || (person.fatherName && person.fatherName
            .toLowerCase().includes(normalizeQuery))
          || (person.motherName && person.motherName
            .toLowerCase().includes(normalizeQuery))
        );
      });
    }

    if (gender !== '') {
      filteredPeople = filteredPeople.filter(person => person.sex === gender);
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople
        .filter(person => {
          const century = Math.ceil(person.died / 100);

          if (centuries.includes(century.toString())) {
            return person;
          }

          return null;
        });
    }

    if (sortCurr !== '') {
      filteredPeople = filteredPeople.sort((a, b) => {
        switch (sortCurr) {
          case 'sex':
          case 'name':
            return a[sortCurr].localeCompare(b[sortCurr]);

          case 'born':
          case 'died':
            return a[sortCurr] - b[sortCurr];

          default: return 0;
        }
      });

      if (order) {
        filteredPeople = filteredPeople.reverse();
      }

      setCurrPeoples(filteredPeople);
    }

    setCurrPeoples(filteredPeople);
  }, [peoples, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peoples?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && (
                <table
                  data-cy="peopleTable"
                  className="
                    table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name

                          <SearchLink
                            params={sortParams('name')}
                          >
                            <span className="icon" aria-label="name">
                              <i className="fas fa-sort" />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex

                          <SearchLink
                            params={sortParams('sex')}
                          >
                            <span className="icon" aria-label="sex">
                              <i className="fas fa-sort" />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born

                          <SearchLink
                            params={sortParams('born')}
                          >
                            <span className="icon" aria-label="born">
                              <i className="fas fa-sort-up" />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died

                          <SearchLink
                            params={sortParams('died')}
                          >
                            <span className="icon" aria-label="died">
                              <i className="fas fa-sort" />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {necessaryPeople.map(people => {
                      const isActive = slug === people.slug;
                      const trClassName = isActive
                        ? 'has-background-warning'
                        : '';

                      return (
                        <tr
                          data-cy="person"
                          key={people.slug}
                          className={trClassName}
                        >
                          <td>
                            <NavLink
                              to={`${people.slug}`}
                              className={classNames(
                                {
                                  'has-text-danger': people.sex === 'f',
                                },
                              )}
                            >
                              {people.name}
                            </NavLink>
                          </td>

                          <td>{people.sex}</td>
                          <td>{people.born}</td>
                          <td>{people.died}</td>
                          {necessaryPeople.find(mother => {
                            return mother.name === people.motherName;
                          }) ? (
                              peoples.map(mother => {
                                if (mother.name === people.motherName) {
                                  return (
                                    <td>
                                      <NavLink
                                        to={`${mother.slug}`}
                                        className="has-text-danger"
                                      >
                                        {mother.name}
                                      </NavLink>
                                    </td>
                                  );
                                }

                                return null;
                              })
                            ) : (
                              <td>
                                {
                                  people.motherName ? people.motherName
                                    : '-'
                                }
                              </td>
                            )}

                          {necessaryPeople.find(father => {
                            return father.name === people.fatherName;
                          }) ? (
                              necessaryPeople.map(father => {
                                if (father.name === people.fatherName) {
                                  return (
                                    <td>
                                      <NavLink
                                        to={`${father.slug}`}
                                      >
                                        {father.name}
                                      </NavLink>
                                    </td>
                                  );
                                }

                                return null;
                              })
                            ) : (
                              <td>
                                {people.fatherName ? people.fatherName : '-'}
                              </td>
                            )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>

      </div>
    </>
  );
};
