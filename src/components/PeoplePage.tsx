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
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  let filteredPeople = people;

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');

  if (query) {
    filteredPeople = filteredPeople.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.motherName?.toLowerCase().includes(query) ||
        p.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(p => {
      const born = Number(p.born);

      if (!Number.isFinite(born)) {
        return false;
      }

      const century = Math.floor((born - 1) / 100) + 1;

      return centuries.includes(String(century));
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
              {!loading && !error && (
                <PeopleFilters peopleLoaded={!loading && !error} />
              )}
            </div>

            <div className="column">
              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
