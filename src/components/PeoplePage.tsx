import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';
import { getSortedPeople } from './getSortedPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePerson, setActivePerson] = useState('');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const notSortParams = !sort || !order;
  const notOrderParams = sort && !order;

  const getPeopleFromsServer = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setSortedPeople(peopleFromServer);
    } catch (Error) {
      setHasError(true);
      setIsLoading(false);

      setTimeout(() => {
        setHasError(false);
      }, 3000);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPeopleFromsServer();
  }, []);

  const getFinalPeopleList = () => {
    return getSortedPeople(filteredPeople, sort, order);
  };

  useEffect(() => {
    setSortedPeople(getFinalPeopleList());
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                people={people}
                setPeople={setFilteredPeople}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(hasError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ))}

              {!isLoading && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable
                  is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <SearchLink
                            params={{
                              sort: notSortParams ? 'name' : null,
                              order: notOrderParams ? 'desc' : null,
                            }}
                          >
                            <span className="icon">
                              <i className={classNames(
                                'fas',
                                { 'fa-sort': sort !== 'name' },
                                { 'fa-sort-up': sort === 'name' && !order },
                                { 'fa-sort-down': sort === 'name' && order },
                              )}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <SearchLink
                            params={{
                              sort: notSortParams ? 'sex' : null,
                              order: notOrderParams ? 'desc' : null,
                            }}
                          >
                            <span className="icon">
                              <i className={classNames(
                                'fas',
                                { 'fa-sort': sort !== 'sex' },
                                { 'fa-sort-up': sort === 'sex' && !order },
                                { 'fa-sort-down': sort === 'sex' && order },
                              )}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <SearchLink
                            params={{
                              sort: notSortParams ? 'born' : null,
                              order: notOrderParams ? 'desc' : null,
                            }}
                          >
                            <span className="icon">
                              <i className={classNames(
                                'fas',
                                { 'fa-sort': sort !== 'born' },
                                { 'fa-sort-up': sort === 'born' && !order },
                                { 'fa-sort-down': sort === 'born' && order },
                              )}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <SearchLink
                            params={{
                              sort: notSortParams ? 'died' : null,
                              order: notOrderParams ? 'desc' : null,
                            }}
                          >
                            <span className="icon">
                              <i className={classNames(
                                'fas',
                                { 'fa-sort': sort !== 'died' },
                                { 'fa-sort-up': sort === 'died' && !order },
                                { 'fa-sort-down': sort === 'died' && order },
                              )}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedPeople.map((person: Person) => (
                      <PersonInfo
                        person={person}
                        key={person.slug}
                        people={people}
                        activePerson={activePerson}
                        setActivePerson={setActivePerson}
                      />
                    ))}
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
