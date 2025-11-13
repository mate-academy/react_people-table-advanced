import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => setPersons(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error ? (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          ) : null}

          <div className="column">
            <div className="box table-container">
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : null}

              {persons.length === 0 && !error && !loading && (
                <p data-cy="noPeopleMessage" className="has-text-danger">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && persons.length > 0 && (
                <PeopleTable persons={persons} />
              )}

              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};