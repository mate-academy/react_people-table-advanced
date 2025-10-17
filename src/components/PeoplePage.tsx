import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
  const allowedSortFields: (keyof Person)[] = ['name', 'sex', 'born', 'died'];
  const sortField: keyof Person | null = allowedSortFields.includes(
    sortBy as keyof Person,
  )
    ? (sortBy as keyof Person)
    : null;

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (isLoading) {
    return <Loader data-cy="loader" />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  const visiblePeople = people
    .filter(person => {
      const normalizedQuery = query.toLowerCase();

      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery);

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(String(Math.floor(person.born / 100) + 1));

      const matchesSex = !sex || person.sex === sex;

      return matchesQuery && matchesCentury && matchesSex;
    })
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      const direction = order === 'desc' ? -1 : 1;

      if (sortField === 'name' || sortField === 'sex') {
        const aVal = String(a[sortField] ?? '').toLowerCase();
        const bVal = String(b[sortField] ?? '').toLowerCase();

        if (aVal === bVal) {
          return 0;
        }

        return aVal.localeCompare(bVal) * direction;
      }

      if (sortField === 'born' || sortField === 'died') {
        const aNum =
          typeof a[sortField] === 'number'
            ? a[sortField]!
            : Number.POSITIVE_INFINITY;
        const bNum =
          typeof b[sortField] === 'number'
            ? b[sortField]!
            : Number.POSITIVE_INFINITY;

        if (aNum === bNum) {
          return 0;
        }

        return aNum > bNum ? direction : -direction;
      }

      return 0;
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && !isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && !isLoading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!error && !isLoading && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
