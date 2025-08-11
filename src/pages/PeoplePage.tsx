import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useFilterPeople, useLoadPeople } from '../utils/hooks';
import { useState } from 'react';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const people = useLoadPeople(setErrorMessage, setIsLoading);
  const peopleList = useFilterPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && people?.length === 0 && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {peopleList?.length === 0 && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && peopleList.length > 0 && (
                <PeopleTable peopleList={peopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
