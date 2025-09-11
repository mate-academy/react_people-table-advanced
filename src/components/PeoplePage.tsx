import React, { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilter';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    const query = searchParams.get('query')?.toLowerCase();

    if (query) {
      result = result.filter(p =>
        [p.name, p.motherName, p.fatherName]
          .filter(Boolean)
          .some(n => n!.toLowerCase().includes(query)),
      );
    }

    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      result = result.filter(p => {
        const bornCentury = Math.floor(p.born / 100) + 1;

        return centuries.includes(String(bornCentury));
      });
    }

    const sortField = searchParams.get('sort') as keyof Person;
    const order = searchParams.get('order');

    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal == null || bVal == null) {
          return 0;
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return order === 'desc' ? bVal - aVal : aVal - bVal;
        }

        return order === 'desc'
          ? String(bVal).localeCompare(String(aVal))
          : String(aVal).localeCompare(String(bVal));
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}
      {error && (
        <p className="has-text-danger" data-cy="peopleLoadingError">
          Something went wrong
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <div className="columns">
          <div className="column is-one-quarter">
            <PeopleFilters />
          </div>
          <div className="column">
            <PeopleTable people={filteredPeople} selectedSlug={slug} />
          </div>
        </div>
      )}
    </>
  );
};
