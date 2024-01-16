import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './Loader/Loader';
import { getPeople } from '../api';
import { Person as PersonType } from '../types/Person';
import { Person } from './person';
import { PeopleFilters } from './PeopleFilters';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const People = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSortClick = (sortType: string): SearchParams => {
    if (sort !== sortType) {
      return { sort: sortType };
    }

    if (sort === sortType && !order) {
      return { sort: sortType, order: 'desc' };
    }

    return ({ sort: null, order: null });
  };

  const visiblePeople = useMemo(() => {
    let peopleToShow = [...people];

    if (query) {
      peopleToShow = peopleToShow.filter(person => {
        const lowQ = query.toLowerCase();

        return (
          person.name.toLowerCase().includes(lowQ)
          || person.motherName?.toLowerCase().includes(lowQ)
          || person.fatherName?.toLowerCase().includes(lowQ)
        );
      });
    }

    if (sex) {
      peopleToShow = peopleToShow.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      peopleToShow = peopleToShow.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(String(century));
      });
    }

    if (sort) {
      peopleToShow = peopleToShow.sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });
    }

    if (order) {
      peopleToShow = peopleToShow.reverse();
    }

    return peopleToShow;
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) }

              {!isLoading && !error && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <SearchLink params={handleSortClick('name')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'name',
                                  'fa-sort-up': sort === 'name'
                                    && order !== 'desc',
                                  'fa-sort-down': sort === 'name'
                                    && order === 'desc',
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <SearchLink params={handleSortClick('sex')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'sex',
                                  'fa-sort-up': sort === 'sex'
                                    && order !== 'desc',
                                  'fa-sort-down': sort === 'sex'
                                    && order === 'desc',
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <SearchLink params={handleSortClick('born')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'born',
                                  'fa-sort-up': sort === 'born'
                                    && order !== 'desc',
                                  'fa-sort-down': sort === 'born'
                                    && order === 'desc',
                                })}
                              />
                            </span>
                          </SearchLink>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <SearchLink params={handleSortClick('died')}>
                            <span className="icon">
                              <i
                                className={classNames('fas', {
                                  'fa-sort': sort !== 'died',
                                  'fa-sort-up': sort === 'died'
                                  && order !== 'desc',
                                  'fa-sort-down': sort === 'died'
                                  && order === 'desc',
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
                    {visiblePeople.map(person => (
                      <Person
                        key={person.slug}
                        person={person}
                        people={people}
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
