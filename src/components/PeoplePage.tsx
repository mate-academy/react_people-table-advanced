import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const normalizedQuery = query.toLowerCase();

  const filteredPeople = people.filter(person => {
    const matchesQuery =
      person.name.toLowerCase().includes(normalizedQuery) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(normalizedQuery)) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(normalizedQuery));

    const matchesSex = !selectedSex || person.sex === selectedSex;
    const personCentury = String(Math.ceil(person.born / 100));
    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(personCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }

    const valueA = a[sortBy as keyof Person];
    const valueB = b[sortBy as keyof Person];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortOrder === 'desc') {
        return valueB.localeCompare(valueA);
      }

      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
    }

    return 0;
  });

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && filteredPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
