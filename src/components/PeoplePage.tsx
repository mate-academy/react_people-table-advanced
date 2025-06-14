import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams();

  const query = (searchParams.get('query') || '').toLowerCase();
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(rawPeople => {
        const map = new Map<string, Person>();

        rawPeople.forEach(p => map.set(p.name, p));

        const linked = rawPeople.map(p => ({
          ...p,
          mother: map.get(p.motherName || ''),
          father: map.get(p.fatherName || ''),
        }));

        setPeople(linked);
      })
      .catch(() => setError('Unable to load people'))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      filtered = filtered.filter(p =>
        [p.name, p.motherName || '', p.fatherName || ''].some(name =>
          name.toLowerCase().includes(query),
        ),
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(p => {
        const birthCentury = Math.ceil(p.born / 100);

        return centuries.includes(birthCentury);
      });
    }

    if (sex === 'm' || sex === 'f') {
      filtered = filtered.filter(p => p.sex === sex);
    }

    if (sort) {
      filtered.sort((a, b) => {
        const valA = a[sort as keyof Person];
        const valB = b[sort as keyof Person];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return valA.localeCompare(valB);
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return valA - valB;
        }

        return 0;
      });

      if (order === 'desc') {
        filtered.reverse();
      }
    }

    return filtered;
  }, [people, query, centuries, sex, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!loading && !visiblePeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
              {!loading && !!visiblePeople.length && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={selectedSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
