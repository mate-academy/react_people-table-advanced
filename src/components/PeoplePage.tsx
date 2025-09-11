import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const resolvedPeople = useMemo(() => {
    return people.map(p => ({
      ...p,
      mother: people.find(m => m.name === p.motherName),
      father: people.find(f => f.name === p.fatherName),
    }));
  }, [people]);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const getCentury = (year: number) => Math.ceil(year / 100);

  const filteredPeople = useMemo(() => {
    return resolvedPeople.filter(p => {
      const matchName =
        p.name.toLowerCase().includes(query) ||
        (p.motherName ?? '').toLowerCase().includes(query) ||
        (p.fatherName ?? '').toLowerCase().includes(query);

      const matchSex = !sex || p.sex === sex;

      const personCentury = getCentury(p.born);
      const matchCentury =
        centuries.length === 0 || centuries.includes(personCentury);

      return matchName && matchSex && matchCentury;
    });
  }, [resolvedPeople, query, sex, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      const aVal = a[sort as keyof Person];
      const bVal = b[sort as keyof Person];

      if (aVal == null || bVal == null) {
        return String(a.name).localeCompare(String(b.name));
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return order === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && <p data-cy="peopleLoadingError">{error}</p>}
              {!loading && sortedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
              {!loading && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
