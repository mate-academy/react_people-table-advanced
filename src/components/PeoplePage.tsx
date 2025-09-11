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
    const matchQuery = person.name.toLowerCase().includes(query);
    const matchSex = sex ? person.sex === sex : true;
    const matchCentury = centuries.length
      ? centuries.includes(String(person.born).slice(0, 2))
      : true;

    return matchQuery && matchSex && matchCentury;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    const valA = a[sortField] ?? '';
    const valB = b[sortField] ?? '';

    if (valA === valB) {
      return 0;
    }

    if (sortOrder === 'asc') {
      return valA > valB ? 1 : -1;
    }

    if (sortOrder === 'desc') {
      return valA > valB ? -1 : 1;
    }

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
            <PeopleFilters />
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
