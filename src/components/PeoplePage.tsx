import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useCallback, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getPeople()
      .then(persons => {
        setPeople(persons);
        setSortedPeople(persons);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sortPeopleByKeys = useCallback(
    (filteredPeopleList: Person[], currentSearchParams: URLSearchParams) => {
      const sortType = currentSearchParams.get('sort');
      const isReverse = currentSearchParams.get('order') === 'desc';

      if (!sortType) {
        setSortedPeople(people);

        return;
      }

      const sortedPersons = [...filteredPeopleList].sort((person1, person2) => {
        switch (sortType) {
          case 'name':
            return person1.name.localeCompare(person2.name);
          case 'sex':
            return person1.sex.localeCompare(person2.sex);
          case 'born':
            return person1.born - person2.born;
          case 'died':
            return person1.died - person2.died;
          default:
            return 0;
        }
      });

      setSortedPeople(isReverse ? sortedPersons.reverse() : sortedPersons);
    },
    [people],
  );

  function applyFilters(
    currentSortedList: Person[],
    currentSearchParams: URLSearchParams,
  ): Person[] {
    let filteredList = [...currentSortedList];

    const sortBySex = currentSearchParams.get('sex');
    const sortByCenturies = currentSearchParams.getAll('centuries');
    const sortByQuery = currentSearchParams.get('query');

    if (sortBySex) {
      filteredList = filteredList.filter(person => person.sex === sortBySex);
    }

    if (sortByCenturies.length > 0) {
      filteredList = filteredList.filter(person =>
        sortByCenturies.includes(`${Math.ceil(person.born / 100)}`),
      );
    }

    if (sortByQuery) {
      filteredList = filteredList.filter(
        person =>
          person.name.toLowerCase().includes(sortByQuery) ||
          person.motherName?.toLowerCase().includes(sortByQuery) ||
          person.fatherName?.toLowerCase().includes(sortByQuery),
      );
    }

    return filteredList;
  }

  useEffect(() => {
    const filteredPeople = applyFilters(people, searchParams);

    sortPeopleByKeys(filteredPeople, searchParams);
  }, [searchParams, people, sortPeopleByKeys]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {hasError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}
                  {people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  {sortedPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={sortedPeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
