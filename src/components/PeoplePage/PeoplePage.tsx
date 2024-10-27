import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useCallback, useEffect, useState } from 'react';

export const PeoplePage = () => {
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPeopleFromApi = useCallback(async () => {
    try {
      const todosFromApi = await getPeople();

      setIsLoading(false);
      setPeople(todosFromApi);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchPeopleFromApi();
  }, [fetchPeopleFromApi]);

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading &&
                (!people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable people={people} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
