import React, { useEffect, useState, useMemo } from 'react';
import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { Person } from '../../types';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = (key: string, value: string | null) => {
    const newSearch = getSearchWith(searchParams, { [key]: value });

    setSearchParams(new URLSearchParams(newSearch));
  };

  return { searchParams, updateParams, setSearchParams };
};

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const { searchParams, setSearchParams } = useQueryParams();

  const filteredPeople = useMemo(() => {
    const query = searchParams.get('query')?.trim().toLowerCase() || '';
    const centuriesParam = searchParams.getAll('centuries');
    const centuries =
      centuriesParam.length === 0 ? [16, 17, 18, 19, 20] : centuriesParam;
    const sex = searchParams.get('sex');

    return people.filter(person => {
      const matchesQuery =
        person.name.toLowerCase().includes(query) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(query)) ||
        (person.fatherName && person.fatherName.toLowerCase().includes(query));
      const matchesCentury = centuries.find(
        century => Math.ceil(person.born / 100) === +century,
      );
      const matchesSex = sex ? person.sex === sex : true;

      return matchesQuery && matchesCentury && matchesSex;
    });
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    const sortKey = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (!sortKey) {
      return filteredPeople;
    }

    const key = sortKey as keyof Pick<Person, 'name' | 'sex' | 'born' | 'died'>;

    return [...filteredPeople].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue > bValue) {
        return sortOrder === 'desc' ? -1 : 1;
      }

      if (aValue < bValue) {
        return sortOrder === 'desc' ? 1 : -1;
      }

      return 0;
    });
  }, [filteredPeople, searchParams]);

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

  const handleSort =
    (field: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const newParams: { [key: string]: string | null } = {};
      const currentSort = searchParams.get('sort');
      const currentOrder = searchParams.get('order');

      if (currentSort === field) {
        if (currentOrder === 'desc') {
          newParams.sort = null;
          newParams.order = null;
        } else {
          newParams.order = 'desc';
        }
      } else {
        newParams.sort = field;
        newParams.order = null;
      }

      const newSearch = getSearchWith(searchParams, newParams);

      setSearchParams(new URLSearchParams(newSearch));
    };

  return (
    <div className="container">
      <h1 className="title" style={{ marginTop: '20px' }}>
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
                ) : sortedPeople.length === 0 ? (
                  <p data-cy="noMatchingPeopleMessage">
                    Nothing was found according to the given criteria
                  </p>
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
                            <a onClick={handleSort('name')}>
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
                            </a>
                          </span>
                        </th>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Sex
                            <a onClick={handleSort('sex')}>
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
                            <a onClick={handleSort('born')}>
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
                            <a onClick={handleSort('died')}>
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
                      <PeopleTable people={sortedPeople} />
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
