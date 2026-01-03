import { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { client } from '../utils/httpClient';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(
      () =>
        client
          .get('/people.json')
          .then(fetchedPeople => {
            if (fetchedPeople.length > 0) {
              for (const person of fetchedPeople) {
                person.mother =
                  fetchedPeople.find(
                    (mother: Person) => mother.name === person.motherName,
                  ) || null;
                person.father =
                  fetchedPeople.find(
                    (father: Person) => father.name === person.fatherName,
                  ) || null;
              }
            }

            setPeople(fetchedPeople || []);
          })
          .catch(() => {
            setErrorMessage('Something went wrong');
          })
          .finally(() => {
            setIsLoading(false);
          }),
      500,
    );
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorMessage && people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
