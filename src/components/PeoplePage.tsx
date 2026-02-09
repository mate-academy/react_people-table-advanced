import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { humanId } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);

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

  const normalizeName = (name: string) => name.trim().toLowerCase();

  const peopleByName = useMemo(() => {
    return new Map(people.map(p => [normalizeName(p.name), p]));
  }, [people]);

  const filteredPeople = useMemo(() => {
    return people.filter(p => {
      const name = p.name.toLowerCase();
      const motherName = (p.motherName || '').toLowerCase();
      const fatherName = (p.fatherName || '').toLowerCase();

      const matchesQuery =
        !query ||
        name.includes(query) ||
        motherName.includes(query) ||
        fatherName.includes(query);

      const matchesSex = !sex || p.sex === sex;

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(String(Math.ceil(p.born / 100)));

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sex, centuries]);

  const visiblePeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return String(aValue).localeCompare(String(bValue));
    });

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sort, order]);

  const showNoMatches = !isLoading && !hasError && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedPersonSlug={humanId ?? null}
                  peopleByName={peopleByName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
