import { useContext, useEffect } from 'react';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../store/PeopleContext';
import { PeopleTable } from '../components/PersonTable';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const {
    isLoading,
    hasError,
    visiblePeople,
    initialPeople,
    setIsLoading,
    setInitialPeople,
    setHasError,
  } = useContext(PeopleContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError('');

      try {
        const loadedPeople = await getPeople();

        setInitialPeople(loadedPeople);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!initialPeople.length && !hasError && !isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!hasError && (
                <>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {!initialPeople.length && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}

                      {!!initialPeople.length && !visiblePeople.length && (
                        <p>
                          There are no people
                          matching the current search criteria
                        </p>
                      )}

                      {!!visiblePeople.length && <PeopleTable />}
                    </>
                  )}
                </>
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {hasError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
