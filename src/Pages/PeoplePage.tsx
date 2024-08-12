import React, { useEffect, useState } from 'react';

import { getPeople } from '../api';

import { Person } from '../types';

import { updatePeopleWithParents } from '../servise';

import { PeopleTable, Loader, PeopleFilters } from '../components';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const emptyPeopleTable = !people.length && !isLoading && !isError;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleData => {
        const updatedPeople = updatePeopleWithParents(peopleData);

        setPeople(updatedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {emptyPeopleTable && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isError && people.length > 0 && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
