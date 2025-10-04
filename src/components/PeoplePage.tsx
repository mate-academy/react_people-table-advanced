import React, { useEffect, useState, useMemo } from 'react';
import { Loader } from './Loader/Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Person } from '../types/Person';
import { readSearchParamsFromHash } from '../utils/hash';

type Props = {
  people: Person[] | null;
  loading: boolean;
  error: string | null;
};

export const PeoplePage: React.FC<Props> = ({ people, loading, error }) => {
  const [sexFilter, setSexFilter] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [centuryFilters, setCenturyFilters] = useState<string[]>([]);

  useEffect(() => {
    const applyParams = () => {
      const params = readSearchParamsFromHash();

      setQuery(params.get('query') ?? '');
      setSexFilter(params.get('sex'));
      setCenturyFilters(params.getAll('centuries'));
    };

    window.addEventListener('hashchange', applyParams);
    applyParams();

    return () => window.removeEventListener('hashchange', applyParams);
  }, []);

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    const includes = (s?: string | null) =>
      (s ?? '').toString().toLowerCase().includes(query.toLowerCase());

    return people.filter(p => {
      const matchesQuery =
        !query ||
        includes(p.name) ||
        includes(p.motherName) ||
        includes(p.fatherName);

      const sexValue = String(p.sex ?? '')
        .trim()
        .toLowerCase();
      const matchesSex =
        !sexFilter ||
        (sexFilter === 'm' && sexValue.startsWith('m')) ||
        (sexFilter === 'f' && sexValue.startsWith('f'));

      const bornCentury = Math.floor((p.born ?? 0) / 100) + 1;
      const matchesCentury =
        centuryFilters.length === 0 ||
        centuryFilters.includes(String(bornCentury));

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sexFilter, centuryFilters]);

  const shouldShowNoPeopleMessage = people && people.length === 0;
  const shouldShowNoResultsMessage = people && filteredPeople.length === 0;

  return (
    <>
      <div className="box mb-5">
        <h1 className="title is-3">People Page</h1>
      </div>

      {shouldShowNoPeopleMessage && (
        <div className="box" data-cy="noPeopleMessage">
          <div className="notification is-warning has-text-centered">
            There are no people to show.
          </div>
        </div>
      )}

      {shouldShowNoResultsMessage && !loading && (
        <div className="box" data-cy="no-results">
          <div className="notification is-warning has-text-centered">
            There are no people matching the current search criteria.
          </div>
        </div>
      )}

      <div className="columns is-multiline">
        <div className="column is-12-mobile is-12-tablet is-8-desktop">
          <div className="box table-container">
            {loading && <Loader />}

            {error ? (
              <div data-cy="peopleLoadingError" style={{ textAlign: 'center' }}>
                Something went wrong
              </div>
            ) : (
              !loading &&
              people &&
              filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  loading={loading}
                  error={error}
                  sexFilter={sexFilter}
                  query={query}
                  centuryFilters={centuryFilters}
                />
              )
            )}
          </div>
        </div>

        {people && (
          <div className="column is-12-mobile is-12-tablet is-4-desktop">
            <PeopleFilters />
          </div>
        )}
      </div>
    </>
  );
};
