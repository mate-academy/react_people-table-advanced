import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

function centuryFromYear(year: number): string {
  return `${Math.floor((year - 1) / 100) + 1}`;
}

export const PeoplePage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorLoad, setErroreLoad] = useState(false);
  const [isActiveSort, setIsActiveSort] = useState(false);

  const query = searchParams.get('query') || null;
  const sexFilter = searchParams.get('sexFilter') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  // console.log(order, 'on page');

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then((res) => {
        setPeople(res);
      })
      .catch(() => setErroreLoad(true))
      .finally(() => setIsLoad(false));
  }, []);

  const activateSort = (param: boolean) => setIsActiveSort(param);

  const filtredPeople = useCallback((peopleToFilter: Person[]): Person[] => {
    let copy = [...peopleToFilter];

    if (query) {
      copy = copy.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase().trim())
      ));
    }

    if (sexFilter === 'm') {
      copy = copy.filter(person => (
        person.sex === 'm'
      ));
    }

    if (sexFilter === 'f') {
      copy = copy.filter(person => (
        person.sex === 'f'
      ));
    }

    if (centuries.length) {
      copy = (copy
        .filter(person => (centuries.includes(centuryFromYear(person.born)))));
    }

    // console.log(copy, 'before')
    if (sort) {
      copy.sort((a, b) => {
        const aElement = (order === 'desc')
          ? b[sort as keyof Person]
          : a[sort as keyof Person];
        const bElement = (order === 'desc')
          ? a[sort as keyof Person]
          : b[sort as keyof Person];

        if (typeof aElement === 'string' && typeof bElement === 'string') {
          return aElement.localeCompare(bElement);
        }

        if (typeof aElement === 'number' && typeof bElement === 'number') {
          return aElement - bElement;
        }

        return 0;
      });
    }

    return copy;
  }, [query, sexFilter, centuries, order, sort, people]);

  const updateSearch = (
    params: { [key: string]: string[] | string | null },
  ) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });
    setSearchParams(searchParams);
  };

  const preparedPeople = useMemo(() => filtredPeople(people),
    [query, sexFilter, centuries, order, sort, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(people.length > 0)
            && (
              <PeopleFilters updateSearch={updateSearch} />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && <Loader />}

              {errorLoad && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people && !isLoad && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!isLoad) && (
                <PeopleTable
                  people={preparedPeople}
                  isActiveSort={isActiveSort}
                  updateSearch={updateSearch}
                  activateSort={activateSort}
                />
              )}

              { query && !(people.some(person => person.name
                .toLowerCase().includes(query.toLowerCase())))
              && people.length > 0 && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
