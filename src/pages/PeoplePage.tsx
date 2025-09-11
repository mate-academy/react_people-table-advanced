import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortField, setSortField] = useState<keyof Person | undefined>(
    undefined,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    undefined,
  );

  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Sorting handler
  const handleSort = (field: keyof Person) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else if (sortOrder === 'desc') {
      setSortField(undefined);
      setSortOrder(undefined);
    }
  };

  // Filtering
  let filtered = [...people];
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  if (query) {
    filtered = filtered.filter(p =>
      [p.name, p.motherName, p.fatherName].some(v =>
        v?.toLowerCase().includes(query),
      ),
    );
  }

  if (sex) {
    filtered = filtered.filter(p => p.sex === sex);
  }

  if (centuries.length) {
    filtered = filtered.filter(p =>
      centuries.includes(String(Math.floor(p.born / 100) + 1)),
    );
  }

  // Sorting
  if (sortField) {
    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      } else {
        return sortOrder === 'desc'
          ? String(bVal).localeCompare(String(aVal))
          : String(aVal).localeCompare(String(bVal));
      }
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && (
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-3">
            <PeopleFilters />
          </div>

          <div className="column">
            <PeopleTable
              people={filtered}
              selectedSlug={slug}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          </div>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p data-cy="noPeopleMessage">No people match your filters</p>
      )}
    </>
  );
};
