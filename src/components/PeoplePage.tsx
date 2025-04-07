import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import peopleData from '../../public/api/people.json';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sortBy, setSortBy] = useState<keyof Person | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>(
    'default',
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setPeople(peopleData);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      // Name filter
      const nameFilter = searchParams.get('name')?.toLowerCase() || '';

      if (nameFilter && !person.name.toLowerCase().includes(nameFilter)) {
        return false;
      }

      // Sex filter
      const sexFilter = searchParams.get('sex');

      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      // Century filter
      const centuryFilters = searchParams.getAll('centuries');

      if (centuryFilters.length > 0) {
        const century = Math.ceil(person.born / 100);

        if (!centuryFilters.includes(String(century))) {
          return false;
        }
      }

      return true;
    });
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    if (!sortBy || sortOrder === 'default') {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === null || aValue === undefined) {
        return 1;
      }

      if (bValue === null || bValue === undefined) {
        return -1;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredPeople, sortBy, sortOrder]);

  const updateHashParams = (newParams: Record<string, string | null>) => {
    const [path, queryString] = window.location.hash.slice(1).split('?');
    const params = new URLSearchParams(queryString || '');

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    window.location.hash = `${path}?${params.toString()}`;
  };

  const handleSort = (field: keyof Person) => {
    let nextOrder: 'asc' | 'desc' | 'default' = 'asc';

    if (sortBy === field) {
      nextOrder =
        sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? 'default' : 'asc';
    }

    const newSortBy = nextOrder === 'default' ? null : field;

    setSortBy(newSortBy);
    setSortOrder(nextOrder);

    updateHashParams({
      sort: newSortBy,
      order: nextOrder === 'default' ? null : nextOrder,
    });
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && !error && sortedPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading && !error && sortedPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
