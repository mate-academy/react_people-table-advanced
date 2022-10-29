import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

  const loadPeople = async () => {
    setLoad(true);
    const peoplesFromServer = await getPeople();
    const peoples = peoplesFromServer.map(peopleFromServer => ({
      ...peopleFromServer,
      mother: peoplesFromServer.find(
        person => person.name === peopleFromServer.motherName,
      ),
      father: peoplesFromServer.find(
        person => person.name === peopleFromServer.fatherName,
      ),
    }));

    try {
      setPeople(peoples);
    } catch {
      setError(true);
    } finally {
      setLoad(false);
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
          {people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {load && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !load && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
