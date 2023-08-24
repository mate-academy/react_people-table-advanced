import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getCentury } from '../utils/helpers';
import { SortEnum } from '../types/SortEnum';

const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

const filterByQuery = (query: string) => (person: Person) => {
  if (!query) {
    return false;
  }

  return (`${person.name} ${person.motherName} ${person.fatherName}`)
    .toLowerCase().includes(query);
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchFilters] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let result = [...people];

    if (searchFilters.get('sex')) {
      result = result.filter(person => person.sex === searchFilters.get('sex'));
    }

    if (searchFilters.get('query')) {
      result = result.filter(
        filterByQuery(searchFilters.get('query') as string),
      );
    }

    if (searchFilters.get('century')) {
      const centuries = searchFilters.getAll('century').map(Number);

      result = result.filter(person => {
        return centuries.includes(getCentury(person.born));
      });
    }

    if (searchFilters.get('sort')) {
      const sortField = searchFilters.get('sort') as string;

      switch (sortField) {
        case SortEnum.Name:
          result = result.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;

        case SortEnum.Sex:
          result = result.sort((a, b) => {
            return a.sex.localeCompare(b.sex);
          });
          break;

        case SortEnum.Born:
          result = result.sort((a, b) => {
            return a.born - b.born;
          });
          break;
        case SortEnum.Died:
          result = result.sort((a, b) => {
            return a.died - b.died;
          });
          break;
        default:
          break;
      }
    }

    if (searchFilters.get('order') === 'desc') {
      result.reverse();
    }

    return result;
  }, [searchFilters, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!people.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) }

              {(!isLoading && !visiblePeople.length) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {(!isLoading && !!visiblePeople.length) && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
