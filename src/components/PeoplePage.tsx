import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useContext, useEffect } from 'react';
import { PeopleContext } from '../context/PeopleContext';

export const PeoplePage = () => {
  const {
    people,
    setPeople,
    isError,
    setIsError,
    loading,
    setLoading,
    noMatch,
  } = useContext(PeopleContext);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && !isError && !loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {isError && <p data-cy="peopleLoadingError">{isError}</p>}

              {people.length === 0 && !isError && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && !isError && !loading && !noMatch && (
                <PeopleTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
