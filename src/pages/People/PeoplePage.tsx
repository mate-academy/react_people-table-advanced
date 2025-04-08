import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleContext } from '../../store/PeopleContext';

export const PeoplePage = () => {
  const { setPeople, filteredPeople, setFilteredPeople } =
    useContext(PeopleContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const handleGetPeople = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const data = await getPeople();

      if (data) {
        setPeople(data);
        setFilteredPeople(data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setFilteredPeople, setPeople]);

  useEffect(() => {
    handleGetPeople();
  }, [handleGetPeople]);

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

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {/* todo: IMPLEMENTAR LOGICA */}
              {/* <p>There are no people matching the current search criteria</p> */}

              {!isLoading && !hasError && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasError && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
