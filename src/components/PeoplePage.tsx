import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { ErrorMessages } from '../types/errorMessages';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPersons)
      .catch(() => setErrorMessage(ErrorMessages.PeopleLoadError))
      .finally(() => setIsLoading(false));
  }, []);

  const personsWithParents: Person[] = persons.map(person => ({
    ...person,
    mother: persons.find(p => p.name === person.motherName),
    father: persons.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!persons.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!persons.length && !isLoading && (
                <PeopleTable people={personsWithParents} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
