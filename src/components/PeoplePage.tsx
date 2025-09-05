import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useEffect } from 'react';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // symulacja ładowania danych
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasError(false); // zmień na true, żeby przetestować error
    }, 500);

    return () => clearTimeout(timer);
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

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
