import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader, PeopleFilters, PeopleTable } from '../components';
import type { Person } from '../types';
import { getFilteredPeople, getPersonByName } from '../utils/otherHelpers';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then((peopleFromServer) => setPeople(peopleFromServer.map(person => {
        const personCopy = { ...person };

        if (person.motherName) {
          personCopy.mother = getPersonByName(
            person.motherName, peopleFromServer,
          );
        }

        if (person.fatherName) {
          personCopy.father = getPersonByName(
            person.fatherName, peopleFromServer,
          );
        }

        return personCopy;
      })))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleToRender = getFilteredPeople(
    people,
    {
      centuries: searchParams.getAll('centuries') || [],
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex') || '',
    },
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length !== 0 && (
                <>
                  {peopleToRender.length
                    ? <PeopleTable people={peopleToRender} />
                    : (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}
                </>
              )}
            </div>

            <p>There are no people matching the current search criteria</p>
          </div>
        </div>
      </div>
    </>
  );
};
