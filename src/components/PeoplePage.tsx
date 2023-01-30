import { memo, useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPersonByName = (name: string | null, peopleArr: Person[]) => (
    peopleArr.find(person => person.name === name)
  );
  const getPeopleFromServer = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person: Person) => {
        return {
          ...person,
          mother: getPersonByName(person.motherName, peopleFromServer),
          father: getPersonByName(person.fatherName, peopleFromServer),
        };
      });

      setPeople(peopleWithParents);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const isPeopleArrEmpty = people.length === 0 && !isError && !isLoading;
  const shouldPeopleBeRendered = people.length !== 0 && !isError;

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {shouldPeopleBeRendered && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isPeopleArrEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {shouldPeopleBeRendered && (
                <PeopleTable people={people} />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
});
