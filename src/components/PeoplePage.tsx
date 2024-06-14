import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query' || null);
  const sex = searchParams.get('sex' || null);
  const sort = searchParams.get('sort' || null);
  const order = searchParams.get('order' || null);
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getPeople()
        .then(response => {
          setFilteredPeople(response);
          setPeople(response);
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setIsLoading(false));
    }, 1000);
  }, []);

  const sortPeople = (
    arr: Person[],
    index: number,
    key: keyof Person,
  ): Person[] => {
    return arr.sort((itemA, itemB) => {
      const valueA = itemA[key];
      const valueB = itemB[key];

      const isString = typeof valueA === 'string' && typeof valueB === 'string';
      const isNumber = typeof valueA === 'number' && typeof valueB === 'number';

      if (isString) {
        return valueA.localeCompare(valueB) * index;
      }

      if (isNumber) {
        return (valueA - valueB) * index;
      }

      return 0;
    });
  };

  const isValidKey = (key: string): key is keyof Person => {
    return ['name', 'sex', 'born', 'died'].includes(key);
  };

  const filterPeople = useCallback(
    (arr: Person[]) => {
      let personArr = arr;

      if (query?.trim()) {
        personArr = personArr.filter(person => person.name.includes(query));
      }

      if (sex) {
        personArr = personArr.filter(person => person.sex === sex);
      }

      if (centuries.length > 0) {
        personArr = personArr.filter(person => {
          const century = Math.ceil(+person.born / 100);

          return centuries.some(item => +item === century);
        });
      }

      if (sort && isValidKey(sort)) {
        personArr = sortPeople(personArr, 1, sort);
      }

      if (sort && order && isValidKey(sort)) {
        personArr = personArr = sortPeople(personArr, -1, sort);
      }

      return personArr;
    },
    [query, sex, centuries, sort, order],
  );

  useEffect(() => {
    setFilteredPeople(() => filterPeople(people));
  }, [filterPeople, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!errorMessage && people.length > 0 && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                query={query}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!errorMessage && !people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  searchParams={searchParams}
                  order={order}
                  sort={sort}
                />
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};
