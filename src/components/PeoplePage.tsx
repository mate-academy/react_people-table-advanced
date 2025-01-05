import React, { useContext, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleContext } from '../store/PeopleContext';
import { Person } from '../types';

type Props = {
  filterItem: string | null;
  filterCentury: number;
  visiblePeople: Person[];
};

export const PeoplePage: React.FC<Props> = () => {
  const {
    people,
    loading,
    loadPeople,
    errorMessage,
    filteredPeople,
    visiblePeople,
  } = useContext(PeopleContext);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters filterItem={''} filterCentury={0} queryInput={''} />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError">{errorMessage}</p>
                  )}

                  {people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : visiblePeople.length === 0 ? (
                    <p data-cy="noMatchingPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  ) : (
                    <PeopleTable
                      people={people}
                      criteria={''}
                      filteredPeople={filteredPeople}
                      visiblePeople={visiblePeople}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
