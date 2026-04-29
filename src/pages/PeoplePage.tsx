import React, { useMemo } from 'react';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import usePeople from '../hooks/usePeople';
import extendPeopleData from '../utils/extendPeopleData';
import useFilteredPeople from '../hooks/useFilteredPeople';

export const PeoplePageBase = () => {
  const { people, isLoading, errorMessage } = usePeople();

  const extendedPeopleData = useMemo(() => {
    return extendPeopleData(people);
  }, [people]);

  const filteredPeople = useFilteredPeople(extendedPeopleData);
  const isNoPeopleLoaded = !isLoading && !errorMessage && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isNoPeopleLoaded && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PeoplePage = React.memo(PeoplePageBase);
