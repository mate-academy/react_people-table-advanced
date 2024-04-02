import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { getPreperedPeople } from '../../utils/getPreparedPeople';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = React.memo(() => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const people = getPreperedPeople(peopleFromServer, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !!peopleFromServer.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!peopleFromServer.length && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {loading && <Loader />}

              {!loading && !!people.length && <PeopleTable people={people} />}

              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
