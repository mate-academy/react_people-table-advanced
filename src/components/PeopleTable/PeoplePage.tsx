import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleFilters } from '../Filters/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((response) => setPeople(response))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = () => {
    const prepared = people.map(person => {
      return ({
        ...person,
        mother: people
          .find(p => p.name === person.motherName || null),
        father: people
          .find(p => p.name === person.fatherName || null),
      });
    });

    return prepared;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && !!people.length && (
              <PeopleFilters />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && !!people.length && (
                <PeopleTable people={preparedPeople()} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
