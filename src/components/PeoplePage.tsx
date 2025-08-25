import React, { useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';

// дозволені поля сортування
type SortableField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setLoadError(null);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setLoadError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const hasPeople = people.length > 0;

  const filtered = useMemo(() => {
    let res = [...people];

    // query filter
    const query = searchParams.get('query')?.trim().toLowerCase();

    if (query) {
      res = res.filter(p => {
        const name = p.name.toLowerCase();
        const mother = (p.motherName || '').toLowerCase();
        const father = (p.fatherName || '').toLowerCase();

        return (
          name.includes(query) ||
          mother.includes(query) ||
          father.includes(query)
        );
      });
    }

    // centuries (multi)
    const centuries = searchParams.getAll('centuries');

    if (centuries.length) {
      res = res.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    // sex
    const sex = searchParams.get('sex');

    if (sex === 'm' || sex === 'f') {
      res = res.filter(p => p.sex === sex);
    }

    // sorting
    const sortFieldParam = searchParams.get('sort');
    const sortField: SortableField | null =
      sortFieldParam === 'name' ||
      sortFieldParam === 'sex' ||
      sortFieldParam === 'born' ||
      sortFieldParam === 'died'
        ? sortFieldParam
        : null;

    const order = searchParams.get('order'); // 'desc' | null

    if (sortField) {
      res.sort((a, b) => {
        const av = a[sortField];
        const bv = b[sortField];

        if (typeof av === 'number' && typeof bv === 'number') {
          return av - bv;
        }

        return String(av).localeCompare(String(bv));
      });

      if (order === 'desc') {
        res.reverse();
      }
    }

    return res;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeople && <PeopleFilters people={people} />}
          </div>

          <div className="column">
            {loading && <Loader />}

            {!loading && loadError && (
              <p data-cy="peopleLoadingError">Something went wrong</p>
            )}

            {!loading && !loadError && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!loading && !loadError && hasPeople && filtered.length === 0 && (
              <p>There are no people matching the current search criteria</p>
            )}

            {!loading && !loadError && filtered.length > 0 && (
              <PeopleTable people={filtered} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
