import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    let filtered = people.filter(person => {
      const matchesSex = !sex || person.sex === sex;

      const normalizedQuery = query?.toLowerCase().trim() || '';
      const matchesQuery =
        !normalizedQuery ||
        person.name.toLowerCase().includes(normalizedQuery) ||
        (person.motherName || '').toLowerCase().includes(normalizedQuery) ||
        (person.fatherName || '').toLowerCase().includes(normalizedQuery);

      const personCentury = String(Math.ceil(person.born / 100));
      const matchesCentury =
        centuries.length === 0 || centuries.includes(personCentury);

      return matchesSex && matchesQuery && matchesCentury;
    });

    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });

      if (order === 'desc') {
        filtered.reverse();
      }
    }

    return filtered;
  }, [people, searchParams]);

  const showNoMatchesMessage =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

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
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatchesMessage && (
                <p>There are no people matching the current search criteria </p>
              )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
