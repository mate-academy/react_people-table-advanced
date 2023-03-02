import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingHasError, setLoadingHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug = '' } = useParams();

  const isTableVisible = Boolean(
    people.length && !loadingHasError && !isLoading,
  );

  const tableIsEmpty = Boolean(
    !people.length && !loadingHasError && !isLoading,
  );

  const getPeopleFromServer = useCallback(async () => {
    setLoadingHasError(false);
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setLoadingHasError(true);
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

              {loadingHasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {tableIsEmpty && (
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
