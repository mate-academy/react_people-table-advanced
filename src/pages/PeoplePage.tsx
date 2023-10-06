import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((resp) => {
        setPeople(resp);

        if (resp.length === 0) {
          setNoPeopleMessage(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error
                && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

              {noPeopleMessage
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!isLoading && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
