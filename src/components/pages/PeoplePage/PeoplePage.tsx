import { useCallback, useEffect, useState } from 'react';

import { Person } from '../../../types/Person';
import { Loader } from '../../Loader';
import { getPeople } from '../../../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadPeople = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setIsLoading(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {(!isLoading && !hasError && people.length)
              && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!isLoading && !hasError) && (
                <>
                  {people.length === 0
                    ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )
                    : (
                      <PeopleTable people={people} />
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
