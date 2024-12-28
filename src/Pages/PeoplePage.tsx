import React from 'react';
import { usePeople } from '../hooks/usePeople';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const { people, preparedPeople, isError, isLoading } = usePeople();

  const isNoPeople = !isLoading && !isError && !people.length;
  const isShowPeople = !!preparedPeople.length && !isError && !isLoading;
  const isNoPeopleByCriteria = !preparedPeople.length && !isLoading;
  const isShowPeopleFilter = !isLoading && !isError && !!people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isShowPeopleFilter && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoPeopleByCriteria && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isShowPeople && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
