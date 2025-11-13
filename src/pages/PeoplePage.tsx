import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api/api';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { filterPeople, sortPeople } from '../utils/filterAndSort';
import React from 'react';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = filterPeople(people, query, centuries, sex);
  const sortedPeople = sortPeople(filteredPeople, sortField, sortOrder);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters people={people} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <>
                  {sortedPeople.length === 0 ? (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable people={sortedPeople} selectedSlug={slug} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
