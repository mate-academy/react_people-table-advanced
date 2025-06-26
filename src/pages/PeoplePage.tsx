import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';

  const selectedCenturies = searchParams.getAll('centuries');
  const getCentury = (year: number) => Math.ceil(year / 100);

  const selectedSex = searchParams.get('sex') || '';

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const personCentury = getCentury(person.born).toString();

    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(personCentury);

    const matchesSex = !selectedSex || person.sex === selectedSex;

    const matchesQuery =
      !query ||
      [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .some(name => name!.toLowerCase().includes(query));

    return matchesCentury && matchesSex && matchesQuery;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });

    if (order === 'desc') {
      sortedPeople.reverse();
    }
  }

  const isEmptyPeople = !isLoading && !hasError && people.length === 0;
  const shouldShowTable = !isLoading && !hasError && people.length > 0;
  const noMatchingPeople =
    filteredPeople.length === 0 && !isLoading && !hasError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {shouldShowTable && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmptyPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {shouldShowTable && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
