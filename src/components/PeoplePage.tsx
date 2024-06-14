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

  const sortPeople = (arr: Person[], index: number, key: string): Person[] => {
    return arr.sort((itemA, itemB) => {
      const string =
        typeof itemA[key] === 'string' && typeof itemB[key] === 'string';
      const number =
        typeof itemA[key] === 'number' && typeof itemB[key] === 'number';

      if (string) {
        return itemA[key].localeCompare(itemB[key]) * index;
      }

      if (number) {
        return (itemA[key] - itemB[key]) * index;
      }
    });
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

      if (sort) {
        personArr = sortPeople(personArr, 1, sort);
      }

      if (sort && order) {
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
