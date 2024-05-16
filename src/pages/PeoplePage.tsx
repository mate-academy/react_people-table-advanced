import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    getPeople()
      .then(peopleFromServer => getPeopleWithParents(peopleFromServer))
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!people.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
