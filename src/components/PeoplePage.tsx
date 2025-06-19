import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people
    .filter(person => {
      const nameMatches = [
        person.name,
        person.fatherName,
        person.motherName,
      ].some(name => name?.toLowerCase().includes(query));

      const century = Math.ceil(person.born / 100);
      const centuryMatches =
        centuries.length === 0 || centuries.includes(`${century}00s`);

      return nameMatches && centuryMatches;
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      const valueA = a[sortBy as keyof Person];
      const valueB = b[sortBy as keyof Person];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });

  return (
    <>
      <h1 className="title" data-cy="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && !hasError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : hasError ? (
                <p data-cy="peopleLoadingError">Failed to load people</p>
              ) : filteredPeople.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
