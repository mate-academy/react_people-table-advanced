/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../Context';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage: React.FC = () => {
  // #region context

  const { people, filteredPeople, loader, loadingError } =
    useContext(PeopleContext);

  // #endregion
  // #region markups

  const tableMarkup = (
    <>
      {!loader && (
        <>
          {people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people.length > 0 && filteredPeople.length === 0 && (
            <p>There are no people matching the current search criteria</p>
          )}
          {people.length > 0 && filteredPeople.length > 0 && <PeopleTable />}
        </>
      )}
    </>
  );

  const peopleMarkup = (
    <>
      {loadingError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        tableMarkup
      )}
    </>
  );

  // #endregion

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <>
            <div className="column is-7-tablet is-narrow-desktop">
              {!loader && <PeopleFilters />}
            </div>
            <div className="column">
              <div className="box table-container">
                {loader ? <Loader /> : peopleMarkup}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
