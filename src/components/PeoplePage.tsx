import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotLoaded, setIsNotLoaded] = useState<boolean>(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  const getUser = (name: string | null, people: Person[]) => {
    return people.find(person => person.name === name);
  };

  const updatePeople = (people: Person[]) => {
    return people.map(person => ({
      ...person,
      mother: getUser(person.motherName, people),
      father: getUser(person.fatherName, people),
    }));
  };

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      setPeopleFromServer(updatePeople(response));
    } catch {
      setIsNotLoaded(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isNotLoaded
                && (
                  <p data-cy="peopleLoadingError">
                    Something went wrong
                  </p>
                )}

              {(!peopleFromServer.length && !isLoading && !isNotLoaded)
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {(!!peopleFromServer.length && !isLoading)
                && <PeopleTable people={peopleFromServer} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
