import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useState, useCallback } from 'react';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(0);

  const handleSetLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  // Função que retorna JSX com base no error
  const renderErrorMessage = () => {
    switch (error) {
      case 1:
        return <p data-cy="peopleLoadingError">Something went wrong</p>;
      case 2:
        return (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        );
      case 3:
        return <p>There are no people matching the current search criteria</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : error !== 0 ? (
                renderErrorMessage()
              ) : (
                <PeopleTable
                  setLoading={handleSetLoading}
                  setError={setError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
