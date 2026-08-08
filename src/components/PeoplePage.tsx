import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const filteredPeople = useMemo(() => {
    const query = searchParams.get('query')?.toLowerCase().trim() || '';
    const sex = searchParams.get('sex') || '';
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    return people
      .filter(person => {
        if (query) {
          const nameMatch = person.name.toLowerCase().includes(query);
          const motherMatch = person.motherName?.toLowerCase().includes(query);
          const fatherMatch = person.fatherName?.toLowerCase().includes(query);

          if (!nameMatch && !motherMatch && !fatherMatch) {
            return false;
          }
        }

        if (sex && person.sex !== sex) {
          return false;
        }

        if (centuries.length > 0) {
          const century = Math.ceil(person.born / 100).toString();

          if (!centuries.includes(century)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (!sort) {
          return 0;
        }

        const aValue = a[sort as keyof Person];
        const bValue = b[sort as keyof Person];

        if (aValue === bValue) {
          return 0;
        }

        if (aValue === null || aValue === undefined) {
          return 1;
        }

        if (bValue === null || bValue === undefined) {
          return -1;
        }

        const isAsc = order !== 'desc';

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const result = aValue.localeCompare(bValue);

          return isAsc ? result : -result;
        }

        if (aValue < bValue) {
          return isAsc ? -1 : 1;
        }

        return isAsc ? 1 : -1;
      });
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && (
        <div className="block">
          <div className="columns is-desktop is-reversed-touch">
            <div className="column">
              {filteredPeople.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the criteria
                </p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>

            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
