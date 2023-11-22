import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { normalizePeople } from '../utils/normalizePeople';
import { PeopleFilters } from './PeopleFilters';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(peopleFromServer => setPeople(normalizePeople(peopleFromServer)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();

  const visiblePeople = filterPeople(people, searchParams);

  if (isLoading || isError) {
    return (
      <>
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </>
    );
  }

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
              {visiblePeople.length ? (
                <PeopleTable people={visiblePeople} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                  {/* <p>There are no people matching the current search criteria</p> */}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
