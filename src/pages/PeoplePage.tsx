import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getPreparedPeople } from '../utils/getPreperedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug = '' } = useParams();

  const isTableVisible = Boolean(
    people.length && !hasLoadingError && !isLoading,
  );

  const isTableEmpty = Boolean(
    !people.length && !hasLoadingError && !isLoading,
  );

  const getPeopleFromServer = useCallback(async () => {
    setHasLoadingError(false);
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();
      const preperedPeople = getPreparedPeople(peopleFromServer);

      setPeople(preperedPeople);
    } catch {
      setHasLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isTableVisible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isTableEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isTableVisible && (
                <PeopleTable selectedPersonSlug={personSlug} people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
