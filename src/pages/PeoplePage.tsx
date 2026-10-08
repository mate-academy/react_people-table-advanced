import { PeopleFilters } from '../components/PeopleFilters';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from '../components/SearchLink';

export type Filters = {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleIsLoading, setPeopleIsLoading] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<string>('');

  useEffect(() => {
    setPeopleIsLoading(true);
    getPeople()
      .then(peopleList => {
        setPeople(peopleList);
      })
      .catch(() => setErrorLoading('Something went wrong'))
      .finally(() => setPeopleIsLoading(false));
  }, []);

  const findMotherByName = (motherName: string | null) => {
    return people.find(person => person.name === motherName);
  };

  const findFatherByName = (FatherName: string | null) => {
    return people.find(person => person.name === FatherName);
  };

  const filteredPeople = people.map(person => ({
    ...person,
    mother: findMotherByName(person.motherName),
    father: findFatherByName(person.fatherName),
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = {
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
    centuries: searchParams.getAll('centuries'),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  };

  const getNewCenturies = (clickedCentury: string) => {
    if (filters.centuries.includes(clickedCentury)) {
      return filters.centuries.filter(century => century !== clickedCentury);
    }

    return [...filters.centuries, clickedCentury];
  };

  const query = filters.query?.toLowerCase() || '';

  const visiblePeople = filteredPeople.filter(person => {
    const matchedBySex = !filters.sex || person.sex === filters.sex;
    const matchedByQuery =
      !filters.query ||
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);
    const matchedByCentury =
      filters.centuries.length === 0 ||
      filters.centuries.includes(Math.ceil(person.born / 100).toString());

    return matchedBySex && matchedByCentury && matchedByQuery;
  });

  const handleChangeQuery = (value: string) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  const sortedPeople = [...visiblePeople].sort((a, b) => {
    let result = 0;

    if (filters.sort === 'name') {
      result = a.name.localeCompare(b.name);
    }

    if (filters.sort === 'sex') {
      result = a.sex.localeCompare(b.sex);
    }

    if (filters.sort === 'born') {
      result = a.born - b.born;
    }

    if (filters.sort === 'died') {
      result = a.died - b.died;
    }

    return filters.order === 'desc' ? -result : result;
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      {peopleIsLoading ? (
        <Loader />
      ) : errorLoading ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                filters={filters}
                getNewCenturies={getNewCenturies}
                onChangeQuery={handleChangeQuery}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable is-narrow
                  is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <SearchLink
                          params={
                            filters.sort !== 'name'
                              ? { sort: 'name', order: null }
                              : filters.order !== 'desc'
                                ? { sort: 'name', order: 'desc' }
                                : { sort: null, order: null }
                          }
                        >
                          Name
                          {filters.sort !== 'name' && (
                            <i className="fas fa-sort" />
                          )}
                          {filters.sort === 'name' && (
                            <i
                              className={
                                filters.order === 'desc'
                                  ? 'fas fa-sort-down'
                                  : 'fas fa-sort-up'
                              }
                            />
                          )}
                        </SearchLink>
                      </th>
                      <th>
                        <SearchLink
                          params={
                            filters.sort !== 'sex'
                              ? { sort: 'sex', order: null }
                              : filters.order !== 'desc'
                                ? { sort: 'sex', order: 'desc' }
                                : { sort: null, order: null }
                          }
                        >
                          Sex
                          {filters.sort !== 'sex' && (
                            <i className="fas fa-sort" />
                          )}
                          {filters.sort === 'sex' && (
                            <i
                              className={
                                filters.order === 'desc'
                                  ? 'fas fa-sort-down'
                                  : 'fas fa-sort-up'
                              }
                            />
                          )}
                        </SearchLink>
                      </th>
                      <th>
                        <SearchLink
                          params={
                            filters.sort !== 'born'
                              ? { sort: 'born', order: null }
                              : filters.order !== 'desc'
                                ? { sort: 'born', order: 'desc' }
                                : { sort: null, order: null }
                          }
                        >
                          Born
                          {filters.sort !== 'born' && (
                            <i className="fas fa-sort" />
                          )}
                          {filters.sort === 'born' && (
                            <i
                              className={
                                filters.order === 'desc'
                                  ? 'fas fa-sort-down'
                                  : 'fas fa-sort-up'
                              }
                            />
                          )}
                        </SearchLink>
                      </th>
                      <th>
                        <SearchLink
                          params={
                            filters.sort !== 'died'
                              ? { sort: 'died', order: null }
                              : filters.order !== 'desc'
                                ? { sort: 'died', order: 'desc' }
                                : { sort: null, order: null }
                          }
                        >
                          Died
                          {filters.sort !== 'died' && (
                            <i className="fas fa-sort" />
                          )}
                          {filters.sort === 'died' && (
                            <i
                              className={
                                filters.order === 'desc'
                                  ? 'fas fa-sort-down'
                                  : 'fas fa-sort-up'
                              }
                            />
                          )}
                        </SearchLink>
                      </th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>
                  <PeopleTable people={sortedPeople} />
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
