import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { Filter } from '../utils/Filter';
import { SearchLink } from './SearchLink';
import { Person } from '../types';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { slug } = useParams();
  const filteredPeople = Filter(people, searchParams);
  const findParent = (parentName: string | null) =>
    people.find(person => person.name === parentName);
  const setSort = (sortBy: string) => {
    const currentSort = searchParams.get('sort');
    const hasOrder = searchParams.has('order');

    if (currentSort === sortBy) {
      return hasOrder
        ? { sort: null, order: null }
        : { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy, order: null };
  };

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && filteredPeople.length !== 0 ? (
                <table
                  data-cy="peopleTable"
                  className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <SearchLink params={setSort('name')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort':
                                    searchParams.get('sort') !== 'name',
                                  'fa-sort-up':
                                    searchParams.get('sort') === 'name' &&
                                    !searchParams.get('order'),
                                  'fa-sort-down':
                                    searchParams.get('sort') === 'name' &&
                                    searchParams.get('order') === 'desc',
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <SearchLink params={setSort('sex')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': searchParams.get('sort') !== 'sex',
                                  'fa-sort-up':
                                    searchParams.get('sort') === 'sex' &&
                                    !searchParams.get('order'),
                                  'fa-sort-down':
                                    searchParams.get('sort') === 'sex' &&
                                    searchParams.get('order') === 'desc',
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <SearchLink params={setSort('born')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort':
                                    searchParams.get('sort') !== 'born',
                                  'fa-sort-up':
                                    searchParams.get('sort') === 'born' &&
                                    !searchParams.get('order'),
                                  'fa-sort-down':
                                    searchParams.get('sort') === 'born' &&
                                    searchParams.get('order') === 'desc',
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <SearchLink params={setSort('died')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort':
                                    searchParams.get('sort') !== 'died',
                                  'fa-sort-up':
                                    searchParams.get('sort') === 'died' &&
                                    !searchParams.get('order'),
                                  'fa-sort-down':
                                    searchParams.get('sort') === 'died' &&
                                    searchParams.get('order') === 'desc',
                                })}
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
                    {filteredPeople.map((person: Person) => (
                      <PeopleTable
                        key={person.slug}
                        person={person}
                        slug={slug}
                        isParentInList={findParent}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
