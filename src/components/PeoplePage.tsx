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
import { getPeople } from '../api';
import { Person } from '../types';
import { SortType } from '../types/sortType';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const query = searchParams.get('query') || null;
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const normalized = useCallback((currentValue: string) => {
    return currentValue.toLowerCase().trim();
  }, []);

  const visiblePerson = useMemo(() => {
    let temp = people.map(person => ({
      ...person,
      mother: people.find(mother => mother.name === person.motherName) || null,
      father: people.find(father => father.name === person.fatherName) || null,
    }));

    if (query) {
      temp = temp.filter(person => (
        normalized(person.name).includes(normalized(query))
        || person.fatherName?.toLocaleLowerCase()
          .trim().includes(normalized(query))
        || person.motherName?.toLocaleLowerCase()
          .trim().includes(normalized(query))
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
      temp.sort((firstPerson, secondPerson) => {
        switch (sort) {
          case SortType.name:
          case SortType.sex:
            return order !== 'desc'
              ? firstPerson[sort].localeCompare(secondPerson[sort])
              : secondPerson[sort].localeCompare(firstPerson[sort]);
          case SortType.born:
          case SortType.died:
            return order !== 'desc'
              ? firstPerson[sort] - secondPerson[sort]
              : secondPerson[sort] - firstPerson[sort];
          default:
            return 0;
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

              {!isLoading && !isError && visiblePerson.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!isLoading && visiblePerson.length > 0 && (
                <PeopleTable people={visiblePerson} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
