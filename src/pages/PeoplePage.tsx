import { useCallback, useEffect, useState } from 'react';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();
      const processedPeople = peopleFromServer.map(person => {
        const { motherName, fatherName } = person;
        const personCopy = { ...person };

        const mother = peopleFromServer.find(({ name }) => motherName === name);
        const father = peopleFromServer.find(({ name }) => fatherName === name);

        if (mother) {
          personCopy.mother = mother;
        }

        if (father) {
          personCopy.father = father;
        }

        return personCopy;
      });

      setPeople(processedPeople);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isLoaded && (
                <Loader />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isLoaded && !people.length && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && people.length && !errorMessage && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
