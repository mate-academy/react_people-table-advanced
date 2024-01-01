import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader, PeopleFilters, PeopleTable } from '../components';
import { getPreparedPeople, getPersonByName } from '../utils/otherHelpers';
import { Person, ErrorMessage } from '../types';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        if (!peopleFromServer.length) {
          setErrorMessage(ErrorMessage.noPeopleOnServer);
        } else {
          setPeople(peopleFromServer.map(person => {
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
          }));
        }
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.peopleLoadingError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleToRender = getPreparedPeople(
    people,
    {
      centuries: searchParams.getAll('centuries') || [],
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex') || '',
      sortField: searchParams.get('sort') as keyof Person || '',
      order: searchParams.get('order') || '',
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

              {(!errorMessage && !isLoading)
                && (peopleToRender.length
                  ? <PeopleTable people={peopleToRender} />
                  : (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  ))}

              {errorMessage === ErrorMessage.peopleLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorMessage.peopleLoadingError}
                </p>
              )}

              {errorMessage === ErrorMessage.noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  {ErrorMessage.noPeopleOnServer}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
