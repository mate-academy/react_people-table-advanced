/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = useMemo(() => {
    let filtered = [...people];

    // --- Filter by name, motherName, fatherName
    if (query.trim()) {
      const lower = query.toLowerCase();

      filtered = filtered.filter(p =>
        [p.name, p.motherName, p.fatherName]
          .filter(Boolean)
          .some(val => val!.toLowerCase().includes(lower)),
      );
    }

    // --- Filter by centuries
    if (centuries.length > 0) {
      filtered = filtered.filter(p => {
        const bornCentury = Math.ceil(p.born / 100);

        return centuries.includes(String(bornCentury));
      });
    }

    // --- Sort logic
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy as keyof Person];
        const bValue = b[sortBy as keyof Person];

        if (aValue === bValue) {
          return 0;
        }

        if (aValue === null || aValue === undefined) {
          return 1;
        }

        if (bValue === null || bValue === undefined) {
          return -1;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }

        return (aValue as number) - (bValue as number);
      });

      if (order === 'desc') {
        filtered.reverse();
      }
    }

    return filtered;
  }, [people, query, centuries, sortBy, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasError && <p>Something went wrong</p>}
              {!isLoading && !hasError && people.length === 0 && (
                <p>No people on the server</p>
              )}
              {!isLoading && !hasError && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
