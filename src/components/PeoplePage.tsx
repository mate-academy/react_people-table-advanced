import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext } from 'react';
import { getPeopleContext } from '../contexts/ContextGetPeople';

export const PeoplePage = () => {
  const { people, isLoading, isError } = useContext(getPeopleContext);

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
              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {isLoading ? <Loader /> : <PeopleTable />}
              {!isLoading && people.length === 0 && !isError ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : null}

              {/* {isError && <p>There are no people matching the current search criteria</p> } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
