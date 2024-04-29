import { Link, useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useMemo, useState } from 'react';
import { getSearchWith, setSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  errorMessage,
  isLoading,
}) => {
  const [preparedPeople, setPreparedPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(() => {
    return searchParams.get('query') || '';
  }, [searchParams]);

  const [centuries] = useMemo(() => {
    return [searchParams.getAll('centuries') || []];
  }, [searchParams]);

  const sex = useMemo(() => {
    return searchParams.get('sex') || '';
  }, [searchParams]);

  const sortFromParams = useMemo(() => {
    return searchParams.get('sort') || '';
  }, [searchParams]);

  const orderFromParams = useMemo(() => {
    return searchParams.get('order') || '';
  }, [searchParams]);

  function handleSort(sortBy: string) {
    setSearchWith(searchParams, setSearchParams, { sort: sortBy || null });

    if (sortFromParams) {
      setSearchWith(searchParams, setSearchParams, { order: 'desk' || null });
    }
  }

  useMemo(() => {
    setPreparedPeople([...people]);

    if (query) {
      setPreparedPeople(currentPeople =>
        currentPeople.filter(
          person =>
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
            person.motherName?.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }

    if (centuries.length > 0) {
      setPreparedPeople(currentPeople =>
        currentPeople.filter(person =>
          centuries.includes(`${Math.ceil(person.born / 100)}`),
        ),
      );
    }

    if (sex) {
      setPreparedPeople(currentPeople =>
        currentPeople.filter(person => person.sex === sex),
      );
    }

    if (sortFromParams) {
      switch (sortFromParams) {
        case 'name':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.name.localeCompare(b.name)),
          );
          break;

        case 'sex':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.sex.localeCompare(b.sex)),
          );

          break;

        case 'born':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.born - b.born),
          );

          break;

        case 'died':
          setPreparedPeople(currentPeople =>
            currentPeople.sort((a, b) => a.born - b.born),
          );
          break;
      }

      if (orderFromParams) {
        setPreparedPeople(currentPeople => currentPeople.reverse());
      }
    }

    return people;
  }, [people, query, centuries, sex, sortFromParams, orderFromParams]);

  return (
    <div className="block">
      <div className="box table-container">
        {errorMessage === 'There are no people on the server' && (
          <p data-cy="noPeopleMessage">{errorMessage}</p>
        )}

        {errorMessage === 'Something went wrong' && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {isLoading ? (
          <Loader />
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
                      onClick={() => handleSort('name')}
                      to={{
                        search: getSearchWith(searchParams, {
                          sort:
                            sortFromParams && orderFromParams ? null : 'name',
                          order:
                            sortFromParams && !orderFromParams ? 'desk' : null,
                        }),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            {
                              'fa-sort': sortFromParams !== 'name',
                            },
                            {
                              'fa-sort-up':
                                sortFromParams === 'name' && !orderFromParams,
                            },
                            {
                              'fa-sort-down':
                                orderFromParams && sortFromParams === 'name',
                            },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <Link
                      onClick={() => handleSort('sex')}
                      to={{
                        search: getSearchWith(searchParams, {
                          sort:
                            sortFromParams && orderFromParams ? null : 'sex',
                          order:
                            sortFromParams && !orderFromParams ? 'desk' : null,
                        }),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            {
                              'fa-sort': sortFromParams !== 'sex',
                            },
                            {
                              'fa-sort-up':
                                sortFromParams === 'sex' && !orderFromParams,
                            },
                            {
                              'fa-sort-down':
                                orderFromParams && sortFromParams === 'sex',
                            },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <Link
                      onClick={() => handleSort('born')}
                      to={{
                        search: getSearchWith(searchParams, {
                          sort:
                            sortFromParams && orderFromParams ? null : 'born',
                          order:
                            sortFromParams && !orderFromParams ? 'desk' : null,
                        }),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            {
                              'fa-sort': sortFromParams !== 'born',
                            },
                            {
                              'fa-sort-up':
                                sortFromParams === 'born' && !orderFromParams,
                            },
                            {
                              'fa-sort-down':
                                orderFromParams && sortFromParams === 'born',
                            },
                          )}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <Link
                      onClick={() => handleSort('died')}
                      to={{
                        search: getSearchWith(searchParams, {
                          sort:
                            sortFromParams && orderFromParams ? null : 'died',
                          order:
                            sortFromParams && !orderFromParams ? 'desk' : null,
                        }),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'fas',
                            {
                              'fa-sort': sortFromParams !== 'died',
                            },
                            {
                              'fa-sort-up':
                                sortFromParams === 'died' && !orderFromParams,
                            },
                            {
                              'fa-sort-down':
                                orderFromParams && sortFromParams === 'died',
                            },
                          )}
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
                <PersonLink key={person.slug} person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
