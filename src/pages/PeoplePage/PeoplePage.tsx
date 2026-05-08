import { useEffect } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { usePeople } from '../../store/PeopleContext';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage = () => {
  const { people, peopleSlugs, fetchPeople, isLoading, hasError } = usePeople();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

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
              {hasError && (
                // <p data-cy="peopleLoadingError" className="has-text-danger">
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!hasError && isLoading && <Loader />}

              {!hasError && !isLoading && !peopleSlugs.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!hasError && !isLoading && !!peopleSlugs.length && (
                <PeopleTable people={people} peopleSlugs={peopleSlugs} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
