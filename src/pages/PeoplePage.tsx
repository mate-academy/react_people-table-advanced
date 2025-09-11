import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Сортування з URL
  const initialSortField = searchParams.get('sort') as keyof Person | null;
  const initialSortOrder = searchParams.get('order') as 'asc' | 'desc' | null;

  const [sortField, setSortField] = useState<keyof Person | undefined>(
    initialSortField || undefined,
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    initialSortOrder || undefined,
  );

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (field: keyof Person) => {
    let newSort: keyof Person | undefined = field;
    let newOrder: 'asc' | 'desc' | undefined = 'asc';

    if (sortField !== field) {
      newSort = field;
      newOrder = 'asc';
    } else if (sortOrder === 'asc') {
      newOrder = 'desc';
    } else if (sortOrder === 'desc') {
      newSort = undefined;
      newOrder = undefined;
    }

    setSortField(newSort);
    setSortOrder(newOrder);

    setSearchParams(
      getSearchWith(searchParams, {
        sort: newSort || null,
        order: newOrder || null,
      }),
    );
  };

  // Фільтрація
  let filteredPeople = [...people];
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  if (query) {
    filteredPeople = filteredPeople.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.motherName?.toLowerCase().includes(query) ||
        p.fatherName?.toLowerCase().includes(query),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(p => {
      const century = Math.floor((p.born - 1) / 100) + 1;

      return centuries.includes(String(century));
    });
  }

  // Сортування
  if (sortField) {
    filteredPeople.sort((a, b) => {
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

      {loading && (
        <div data-cy="loader">
          <Loader />
        </div>
      )}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters peopleLoaded={!loading && !error} />
            </div>

            <div className="column">
              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  selectedSlug={slug}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
