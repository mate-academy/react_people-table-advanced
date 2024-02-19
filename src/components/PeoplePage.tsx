import React, { useState, useEffect } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoPeople, setHasNoPeople] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => {
        if (!response.length) {
          setHasNoPeople(true);
        }

        setPeople(response);
      })
      .catch(error => {
        setHasError(true);
        setHasNoPeople(false);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);

        setTimeout(() => {
          setHasError(false);
        }, 2000);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {hasError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {hasNoPeople && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <p>There are no people matching the current search criteria</p>

                {!hasNoPeople && !hasError && <PeopleTable people={people} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
