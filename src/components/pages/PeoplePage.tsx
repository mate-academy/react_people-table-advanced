import { useCallback, useEffect, useState } from 'react';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      setIsLoading(false);
      setPeople(loadedPeople);
    } catch (error) {
      setHasError(true);
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
          {!!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoading && <Loader />}

              {!hasError && !isLoading
              && <PeopleTable people={people} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
