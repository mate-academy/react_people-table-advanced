import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type FilterState = {
  query: string;
  sex: string | null;
  centuries: string[];
  sort: string | null;
  order: 'asc' | 'desc';
};

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const { slug } = useParams<{ slug: string }>();

  const filters = useMemo<FilterState>(
    () => ({
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex'),
      centuries: searchParams.getAll('centuries'),
      sort: searchParams.get('sort'),
      order: (searchParams.get('order') as 'asc' | 'desc') || 'asc',
    }),
    [searchParams],
  );

  // Load people from API
  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(rawPeople => {
        const peopleWithRelations = rawPeople.map(person => ({
          ...person,
          mother: rawPeople.find(parent => parent.name === person.motherName),
          father: rawPeople.find(parent => parent.name === person.fatherName),
        }));

        setPeople(peopleWithRelations);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Filter and sort people
  useEffect(() => {
    let result = people;

    // Apply name filter
    if (filters.query) {
      const query = filters.query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    // Apply sex filter
    if (filters.sex) {
      result = result.filter(person => person.sex === filters.sex);
    }

    // Apply centuries filter
    if (filters.centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100);

        return filters.centuries.includes(String(century));
      });
    }

    // Apply sorting
    if (filters.sort) {
      result = [...result].sort((a, b) => {
        const field = filters.sort as keyof Person;
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return filters.order === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return filters.order === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    setFilteredPeople(result);
  }, [people, filters]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                onSearchParamsChange={setSearchParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && people.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* eslint-disable @typescript-eslint/indent */}
              {!isLoading &&
                filteredPeople.length === 0 &&
                people.length > 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              {/* eslint-enable @typescript-eslint/indent */}

              {!isLoading && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  searchParams={searchParams}
                  onSearchParamsChange={setSearchParams}
                  filters={filters}
                  selectedSlug={slug || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
