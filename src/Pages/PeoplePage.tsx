import { useCallback, useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilter/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <>
                    {hasError && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {!people.length && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}
                  </>
                )}

              {(!hasError && !!people.length) && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
