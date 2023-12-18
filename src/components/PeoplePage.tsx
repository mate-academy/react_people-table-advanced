import { useContext } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from './PeopleContext';
import { MainContentType } from '../types/MainContentType';

export const PeoplePage = () => {
  const { mainContent } = useContext(PeopleContext);

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
              {mainContent === MainContentType.Loader && (
                <Loader />
              )}

              {mainContent === MainContentType.PeopleLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {mainContent === MainContentType.NoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {mainContent === MainContentType.NoFiltredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {mainContent === MainContentType.PeopleTable && (
                <PeopleTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
