import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext } from 'react';

import { StateContext } from '../GlobalProvider';

export const PeoplePage = () => {
  const {
    peopleList,
    loader,
    errorMessage,
    visiblePeopleList: visiblePeoplelist,
  } = useContext(StateContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && peopleList.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {peopleList.length === 0 && !errorMessage && !loader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeoplelist.length === 0 && peopleList.length !== 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeoplelist.length !== 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
