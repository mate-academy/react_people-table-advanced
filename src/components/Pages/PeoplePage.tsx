import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import type { Person } from '../../types/Person';


type SortField = keyof Pick<Person, 'name' | 'sex' | 'born' | 'died'>;
type SortOrder = 'asc' | 'desc';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').trim();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sortByParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const sortBy: SortField | null = ['name', 'sex', 'born', 'died'].includes(sortByParam || '')
    ? (sortByParam as SortField)
    : null;

  const sortOrder: SortOrder = orderParam === 'desc' ? 'desc' : 'asc';

  useEffect(() => {
    setLoading(true);
    setError(null);
    let cancelled = false;

    getPeople()
      .then(data => {
        if (!cancelled) setPeople(data);
      })
      .catch(() => {
        if (!cancelled) setError('Something went wrong');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visiblePeople = useMemo(() => {
    if (!people.length) {
      return [];
    }

    let filtered = [...people];

    if (sex === 'm' || sex === 'f') {
      filtered = filtered.filter(p => p.sex === sex);
    }

    if (query) {
      const q = query.toLowerCase();

      filtered = filtered.filter(p =>
        [p.name, p.motherName, p.fatherName]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q)),
      );
    }

    if (centuries.length > 0) {
      const centurySet = new Set(centuries.map(c => Number(c)));

      filtered = filtered.filter(p => {
        const bornCentury = p.born ? Math.ceil(p.born / 100) : null;
        return bornCentury != null && centurySet.has(bornCentury);
      });
    }

    if (sortBy) {
      const dir = sortOrder === 'asc' ? 1 : -1;

      filtered.sort((a, b) => {
        const av = a[sortBy];
        const bv = b[sortBy];

        if (av == null && bv == null) return 0;
        if (av == null) return -1 * dir;
        if (bv == null) return 1 * dir;

        if (typeof av === 'number' && typeof bv === 'number') {
          return (av - bv) * dir;
        }

        return String(av).localeCompare(String(bv)) * dir;
      });
    }

    return filtered;
  }, [people, sex, query, centuries, sortBy, sortOrder]);

  const hasData = people.length > 0;
  const hasVisible = visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasData && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!loading && !hasData && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasData && !hasVisible && !loading && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasVisible && (
                <PeopleTable
                  people={visiblePeople}
                  allPeople={people}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
