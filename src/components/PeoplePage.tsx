import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sortField = searchParams.get('sort') as keyof Person | null;
  const sortOrder = searchParams.get('order') as 'asc' | 'desc' | null;

  const filtered = people.filter(person => {
    const fields = [
      person.name,
      person.motherName ?? '',
      person.fatherName ?? '',
    ].map(f => f.toLowerCase());

    const matchQuery = fields.some(f => f.includes(query));
    const matchSex = sex ? person.sex === sex : true;
    const matchCentury = centuries.length
      ? centuries.includes(String(Math.ceil(person.born / 100)))
      : true;

    return matchQuery && matchSex && matchCentury;
  });

  const allowedSortFields: (keyof Person)[] = ['name', 'sex', 'born', 'died'];

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField || !allowedSortFields.includes(sortField)) return 0;

    const valA = a[sortField];
    const valB = b[sortField];

    if (typeof valA === 'number' && typeof valB === 'number') {
      if (sortOrder === 'asc') return (valA ?? Infinity) - (valB ?? Infinity);
      if (sortOrder === 'desc')
        return (valB ?? -Infinity) - (valA ?? -Infinity);
      return 0;
    }

    const strA = (valA ?? '').toString();
    const strB = (valB ?? '').toString();

    if (sortOrder === 'asc') return strA.localeCompare(strB);
    if (sortOrder === 'desc') return strB.localeCompare(strA);
    return 0;
  });

  return (
    <section className="section">
      <div className="container">
        <h1 className="title" data-cy="pageTitle">
          People Page
        </h1>
        <div className="columns">
          <div className="column is-one-quarter">
            {!loading && !error && <PeopleFilters />}
          </div>
          <div className="column">
            {loading && <div data-cy="loader">Loading...</div>}
            {error && (
              <div
                data-cy="peopleLoadingError"
                className="notification is-danger"
              >
                Error loading people
              </div>
            )}
            {!loading && !error && sorted.length === 0 && (
              <div
                data-cy="noPeopleMessage"
                className="notification is-warning"
              >
                No people found
              </div>
            )}
            {!loading && !error && sorted.length > 0 && (
              <PeopleTable people={sorted} selectedSlug={selectedSlug} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
