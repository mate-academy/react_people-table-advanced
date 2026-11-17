import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import type { Person } from '../types/Person';
import { getVisiblePeople } from '../utils/getVisiblePeople';

import { Loader } from '../components/Loader/Loader';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = getVisiblePeople(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && (
        <div className="columns">
          <div className="column is-one-quarter">
            <PeopleFilters />
          </div>

          <div className="column">
            {people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : visiblePeople.length === 0 ? (
              <p data-cy="noPeopleMessage">
                There are no people matching the current search criteria
              </p>
            ) : (
              <PeopleTable
                people={visiblePeople}
                allPeople={people}
                selectedSlug={slug}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
