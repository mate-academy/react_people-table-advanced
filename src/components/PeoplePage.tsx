import React, { useContext } from 'react';
import { PeopleContext } from '../PeopleContext';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { ErrorMessages } from '../types/ErrorMessages';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const { peopleList, isLoading, errorMessage } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!peopleList.length && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

              {errorMessage === ErrorMessages.LoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorMessages.SomethingWentWrong}
                </p>
              )}

              {(!peopleList.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  {ErrorMessages.NoPeople}
                </p>
              )}

              {!!peopleList.length && (
                <PeopleTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
