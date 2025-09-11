import React, { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const query = searchParams.get('query') || '';
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    let filtered = people;

    if (query) {
      const lower = query.toLowerCase();

      filtered = filtered.filter(p =>
        [p.name, p.motherName, p.fatherName]
          .filter(Boolean)
          .some(val => val!.toLowerCase().includes(lower)),
      );
    }

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField as keyof Person];
        const bVal = b[sortField as keyof Person];

        if (aVal! < bVal!) {
          return sortOrder === 'desc' ? 1 : -1;
        }

        if (aVal! > bVal!) {
          return sortOrder === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filtered;
  }, [people, query, sortField, sortOrder]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <>
          <div className="field">
            <label className="label" htmlFor="searchInput">
              Search
            </label>
            <input
              id="searchInput"
              type="text"
              className="input"
              placeholder="Type to search..."
            />
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by name"
                value={query}
                onChange={handleQueryChange}
              />
            </div>
          </div>

          <PeopleTable people={visiblePeople} selectedSlug={slug} />
        </>
      )}
    </>
  );
};
