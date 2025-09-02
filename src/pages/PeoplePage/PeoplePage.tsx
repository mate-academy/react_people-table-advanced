import React from 'react';
import { Loader } from '../../components/Loader';
import { usePeopleList } from '../../hooks/usePeopleList';
import { ErrorMessage } from '../../types/ErrorMessage';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage = () => {
  const { peopleList, errorMessage, isLoading } = usePeopleList();
  const [searchParams] = useSearchParams();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleList.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="box table-container">
            {isLoading && <Loader />}

            {errorMessage === ErrorMessage.Unknown && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}

            {errorMessage === ErrorMessage.NoPeopleOnServer && (
              <p data-cy="noPeopleMessage">{errorMessage}</p>
            )}

            {peopleList.length > 0 && (
              <PeopleTable
                key={searchParams.toString()}
                peopleList={peopleList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
