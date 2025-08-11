import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  return { searchParams, updateParams, setSearchParams };
};

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const { searchParams, setSearchParams } = useQueryParams();

  const filteredPeople = people.filter(person => {
    const normalisedQuery =
      searchParams.get('query')?.trim().toLowerCase() || '';
    const matchesQuery =
      person.name.trim().toLowerCase().includes(normalisedQuery) ||
      person.motherName?.trim().toLowerCase().includes(normalisedQuery) ||
      person.fatherName?.trim().toLowerCase().includes(normalisedQuery);

    const centuries =
      searchParams.getAll('centuries').length === 0
        ? [16, 17, 18, 19, 20]
        : searchParams.getAll('centuries');
    const matchesCentury = centuries.find(century => {
      return Math.ceil(person.born / 100) === +century;
    });

    const sex = searchParams.get('sex');
    const matchesSex = sex ? person.sex === sex : true;

    return matchesQuery && matchesCentury && matchesSex;
  });

  const preparedPeople = filteredPeople.sort((person1, person2) => {
    const sortBy = searchParams.get('sort');
    const order = searchParams.get('order');

    switch (sortBy) {
      case 'name':
        if (!order) {
          return person1.name.localeCompare(person2.name);
        } else {
          return person2.name.localeCompare(person1.name);
        }

      case 'sex':
        if (!order) {
          return person1.sex.localeCompare(person2.sex);
        } else {
          return person2.sex.localeCompare(person1.sex);
        }

      case 'born':
        if (!order) {
          return person1.born - person2.born;
        } else {
          return person2.born - person1.born;
        }

      case 'died':
        if (!order) {
          return person1.died - person2.died;
        } else {
          return person2.died - person1.died;
        }

      default:
        return;
    }
  });

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        if (data.length === 0) {
          setError(true);
        } else {
          setPeople(data);
        }
      })
      .catch(() => setErrorLoading(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title" style={{ marginTop: '100px' }}>
          People Page
        </h1>

        {errorLoading ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : error ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="column">
                <div className="box table-container">
                  {loading ? (
                    <Loader />
                  ) : (
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
                              <Link
                                onClick={e => {
                                  e.preventDefault();
                                  const params = new URLSearchParams(
                                    searchParams,
                                  );
                                  const currentSort = params.get('sort');
                                  const currentOrder = params.get('order');

                                  if (currentSort === 'name') {
                                    if (currentOrder === 'desc') {
                                      params.delete('sort');
                                      params.delete('order');
                                    } else {
                                      params.set('order', 'desc');
                                    }
                                  } else {
                                    params.set('sort', 'name');
                                    params.delete('order');
                                  }

                                  setSearchParams(params);
                                }}
                              >
                                <span className="icon">
                                  <i
                                    className={classNames('fas', {
                                      'fa-sort':
                                        searchParams.get('sort') !== 'name',
                                      'fa-sort-up':
                                        searchParams.get('sort') === 'name' &&
                                        !searchParams.has('order'),
                                      'fa-sort-down':
                                        searchParams.get('order') === 'desc' &&
                                        searchParams.get('sort') === 'name',
                                    })}
                                  />
                                </span>
                              </Link>
                            </span>
                          </th>

                          <th>
                            <span className="is-flex is-flex-wrap-nowrap">
                              Sex
                              <a
                                onClick={e => {
                                  e.preventDefault();
                                  const params = new URLSearchParams(
                                    searchParams,
                                  );
                                  const currentSort = params.get('sort');
                                  const currentOrder = params.get('order');

                                  if (currentSort === 'sex') {
                                    if (currentOrder === 'desc') {
                                      params.delete('sort');
                                      params.delete('order');
                                    } else {
                                      params.set('order', 'desc');
                                    }
                                  } else {
                                    params.set('sort', 'sex');
                                    params.delete('order');
                                  }

                                  setSearchParams(params);
                                }}
                              >
                                <span className="icon">
                                  <i
                                    className={classNames('fas', {
                                      'fa-sort':
                                        searchParams.get('sort') !== 'sex',
                                      'fa-sort-up':
                                        searchParams.get('sort') === 'sex' &&
                                        !searchParams.has('order'),
                                      'fa-sort-down':
                                        searchParams.get('order') === 'desc' &&
                                        searchParams.get('sort') === 'sex',
                                    })}
                                  />
                                </span>
                              </a>
                            </span>
                          </th>

                          <th>
                            <span className="is-flex is-flex-wrap-nowrap">
                              Born
                              <a
                                onClick={e => {
                                  e.preventDefault();
                                  const params = new URLSearchParams(
                                    searchParams,
                                  );
                                  const currentSort = params.get('sort');
                                  const currentOrder = params.get('order');

                                  if (currentSort === 'born') {
                                    if (currentOrder === 'desc') {
                                      params.delete('sort');
                                      params.delete('order');
                                    } else {
                                      params.set('order', 'desc');
                                    }
                                  } else {
                                    params.set('sort', 'born');
                                    params.delete('order');
                                  }

                                  setSearchParams(params);
                                }}
                              >
                                <span className="icon">
                                  <i
                                    className={classNames('fas', {
                                      'fa-sort':
                                        searchParams.get('sort') !== 'born',
                                      'fa-sort-up':
                                        searchParams.get('sort') === 'born' &&
                                        !searchParams.has('order'),
                                      'fa-sort-down':
                                        searchParams.get('order') === 'desc' &&
                                        searchParams.get('sort') === 'born',
                                    })}
                                  />
                                </span>
                              </a>
                            </span>
                          </th>

                          <th>
                            <span className="is-flex is-flex-wrap-nowrap">
                              Died
                              <a
                                onClick={e => {
                                  e.preventDefault();
                                  const params = new URLSearchParams(
                                    searchParams,
                                  );
                                  const currentSort = params.get('sort');
                                  const currentOrder = params.get('order');

                                  if (currentSort === 'died') {
                                    if (currentOrder === 'desc') {
                                      params.delete('sort');
                                      params.delete('order');
                                    } else {
                                      params.set('order', 'desc');
                                    }
                                  } else {
                                    params.set('sort', 'died');
                                    params.delete('order');
                                  }

                                  setSearchParams(params);
                                }}
                              >
                                <span className="icon">
                                  <i
                                    className={classNames('fas', {
                                      'fa-sort':
                                        searchParams.get('sort') !== 'died',
                                      'fa-sort-up':
                                        searchParams.get('sort') === 'died' &&
                                        !searchParams.has('order'),
                                      'fa-sort-down':
                                        searchParams.get('order') === 'desc' &&
                                        searchParams.get('sort') === 'died',
                                    })}
                                  />
                                </span>
                              </a>
                            </span>
                          </th>

                          <th>Mother</th>
                          <th>Father</th>
                        </tr>
                      </thead>
                      <tbody>
                        <PeopleTable people={preparedPeople} />
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
