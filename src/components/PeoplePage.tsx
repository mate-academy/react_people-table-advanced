import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { ORDER_OPTIONS, Sort, SORT_OPTIONS } from '../types/Sort';

const getNormalizedPeopleList = (originalList: Person[]): Person[] => {
  return originalList.map((person: Person) => {
    const normalizedPerson = { ...person };

    if (person.motherName) {
      const searchResult = originalList.find(
        pers => pers.name === person.motherName,
      );

      if (searchResult) {
        normalizedPerson.mother = searchResult;
      }
    }

    if (person.fatherName) {
      const searchResult = originalList.find(
        pers => pers.name === person.fatherName,
      );

      if (searchResult) {
        normalizedPerson.father = searchResult;
      }
    }

    return normalizedPerson;
  });
};

const getFilteredPeopleList = (
  sex: string | null,
  query: string | null,
  centuries: string[],
  originalList: Person[],
): Person[] => {
  let result = originalList;

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  const normalizedQuery = query?.trim().toLowerCase();

  if (normalizedQuery) {
    result = result.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (centuries.length) {
    result = result.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  return result;
};

const getSortedPeopleList = (
  sortBy: string | null,
  sortOrder: string | null,
  originalList: Person[],
): Person[] => {
  if (
    !sortBy ||
    !(SORT_OPTIONS as readonly string[]).includes(sortBy) ||
    (sortOrder !== null &&
      !(ORDER_OPTIONS as readonly string[]).includes(sortOrder))
  ) {
    return originalList;
  }

  const sortKey = sortBy as Sort;

  const sortedList = [...originalList].sort((p1, p2) => {
    if (sortKey === 'name' || sortKey === 'sex') {
      return p1[sortKey].localeCompare(p2[sortKey]);
    }

    return p1[sortKey] - p2[sortKey];
  });

  return sortOrder === 'desc' ? sortedList.reverse() : sortedList;
};

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const preparedList: Person[] = useMemo(() => {
    const normalizedList = getNormalizedPeopleList(peopleList);

    const filteredList = getFilteredPeopleList(
      searchParams.get('sex'),
      searchParams.get('query'),
      searchParams.getAll('centuries'),
      normalizedList,
    );

    return getSortedPeopleList(
      searchParams.get('sort'),
      searchParams.get('order'),
      filteredList,
    );
  }, [peopleList, searchParams]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isLoaded = !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && !!peopleList.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoaded && !peopleList.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && !!peopleList.length && !preparedList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && !!preparedList.length && (
                <PeopleTable list={preparedList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
