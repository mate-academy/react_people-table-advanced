import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { SortType } from '../types/sortType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const query = searchParams.get('query') || null;
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const normalizedQuery = useCallback((currentQuery: string) => {
    return currentQuery.toLowerCase().trim();
  }, []);

  const visiblePeople = useMemo(() => {
    let temp = people.map(person => ({
      ...person,
      mother: people.find(mother => mother.name === person.motherName) || null,
      father: people.find(father => father.name === person.fatherName) || null,
    }));

    if (query) {
      temp = temp.filter(person => (
        person.name.toLowerCase().trim().includes(normalizedQuery(query))
        || person.mother?.name
          .toLowerCase()
          .trim()
          .includes(normalizedQuery(query))
        || person.father?.name
          .toLowerCase()
          .trim()
          .includes(normalizedQuery(query))
      )) || null;
    }

    if (centuries.length !== 0) {
      temp = temp.filter(person => (
        centuries.includes(Math.ceil(person.born / 100).toString())
      ));
    }

    if (sex) {
      temp = temp.filter(person => (
        person.sex === sex
      ));
    }

    if (sort) {
      temp.sort((firstElement, secondElement) => {
        switch (sort) {
          case SortType.name:
          case SortType.sex:
            return order !== 'desc'
              ? firstElement[sort].localeCompare(secondElement[sort])
              : secondElement[sort].localeCompare(firstElement[sort]);
          case SortType.born:
          case SortType.died:
            return order !== 'desc'
              ? firstElement[sort] - secondElement[sort]
              : secondElement[sort] - firstElement[sort];
          default: return 0;
        }
      });
    }

    return temp;
  }, [people, query, centuries, sex, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
