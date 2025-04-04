import { PeopleFilters } from './PeopleFilters/PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable/PeopleTable';
import { useState } from 'react';

type ErrorType = 'empty' | 'unloaded' | 'wrongsearch' | null;

export interface PeoplePageStateType {
  error: ErrorType;
  isLoading: boolean;
}

export const PeoplePage = () => {
  const [peoplePageState, setPeoplePageState] = useState<PeoplePageStateType>({
    error: null,
    isLoading: true,
  });

  const { error, isLoading } = peoplePageState;

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

              {error === 'unloaded' && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {error === 'empty' && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {error === 'wrongsearch' && (
                <p>There are no people matching the current search criteria</p>
              )}

              <PeopleTable
                setPeoplePageState={setPeoplePageState}
                peoplePageState={peoplePageState}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
