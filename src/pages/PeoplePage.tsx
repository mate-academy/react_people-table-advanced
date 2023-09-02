import React, { useState, useEffect } from 'react';

import { getPeople } from '../api';

import { Loader } from '../components/Loader';
import { TableSideFilters } from '../components/TableSideFilters';
import { TablePersons } from '../components/TablePersons';

import { Person } from '../types/Person';
import { ErrorTypes } from '../types/ErrorTypes';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<ErrorTypes>(ErrorTypes.noError);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then(setPersons)
      .catch(() => setHasError(ErrorTypes.error))
      .finally(() => setIsLoading(false));
  }, []);

  const personsToRender = persons.map(somebody => {
    const person = { ...somebody };

    person.father = persons.find(p => p.name === somebody.fatherName);
    person.mother = persons.find(p => p.name === somebody.motherName);

    return person;
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <TableSideFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  { ErrorTypes.error }
                </p>
              )}
              {!personsToRender.length && !hasError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  { ErrorTypes.warning }
                </p>
              )}
              {!hasError && !isLoading && (
                <TablePersons persons={personsToRender} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
