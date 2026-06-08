import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPeople()
      .then(fetchedPeople => {
        const peopleWithRelations = fetchedPeople.map(person => {
          const mother = person.motherName
            ? fetchedPeople.find(human => human.name === person.motherName)
            : undefined;
          const father = person.fatherName
            ? fetchedPeople.find(human => human.name === person.fatherName)
            : undefined;

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithRelations);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      if (currentSex && person.sex !== currentSex) {
        return false;
      }

      if (query.trim()) {
        const normalizedQuery = query.toLowerCase().trim();
        const matchesName = person.name.toLowerCase().includes(normalizedQuery);
        const matchesMother = person.motherName
          ?.toLowerCase()
          .includes(normalizedQuery);
        const matchesFather = person.fatherName
          ?.toLowerCase()
          .includes(normalizedQuery);

        if (!matchesName && !matchesMother && !matchesFather) {
          return false;
        }
      }

      if (selectedCenturies.length > 0) {
        const personCentury = Math.ceil(person.born / 100).toString();

        if (!selectedCenturies.includes(personCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [people, currentSex, query, selectedCenturies]);

  const sortedPeople = useMemo(() => {
    return [...filteredPeople].sort((firstPerson, secondPerson) => {
      if (!currentSort) {
        return 0;
      }

      const firstValue = firstPerson[currentSort as keyof Person] ?? '';
      const secondValue = secondPerson[currentSort as keyof Person] ?? '';

      if (currentOrder === 'desc') {
        return typeof secondValue === 'number' && typeof firstValue === 'number'
          ? secondValue - firstValue
          : secondValue.toString().localeCompare(firstValue.toString());
      }

      return typeof firstValue === 'number' && typeof secondValue === 'number'
        ? firstValue - secondValue
        : firstValue.toString().localeCompare(secondValue.toString());
    });
  }, [filteredPeople, currentSort, currentOrder]);

  const isDataLoaded = !isLoading && !error && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isDataLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isDataLoaded && sortedPeople.length === 0 && (
                <p data-cy="searchValidation">
                  There are no people matching the current search criteria
                </p>
              )}

              {isDataLoaded && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
