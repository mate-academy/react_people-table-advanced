import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const {
    isLoading,
    isError,
    isPeoplePage,
    isPeople,
    setIsLoading,
    setPeople,
    setIsError,
  } = useContext(PeopleContext);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setPeople([]);
      setIsError(false);
    };
  }, [isPeoplePage, setIsLoading, setIsError, setPeople]);

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
              ) : isError ? (
                <p className="has-text-danger">Something went wrong</p>
              ) : !isPeople ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
