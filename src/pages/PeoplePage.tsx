import 'bulma/css/bulma.css';
import { getPeople } from '../api';
import { useState, useEffect, useCallback } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const peopleFromServer = await getPeople();
      const peopleMap = new Map(peopleFromServer.map(p => [p.name, p]));
      const peopleWithParents = peopleFromServer.map(person => ({
        ...person,
        mother: person.motherName ? peopleMap.get(person.motherName) : null,
        father: person.fatherName ? peopleMap.get(person.fatherName) : null,
      }));

      setPeople(peopleWithParents);
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  let status = 'loading';

  if (error) {
    status = 'error';
  } else if (!isLoading && people.length > 0) {
    status = 'loaded';
  } else if (!isLoading && people.length === 0) {
    status = 'empty';
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {status === 'error' && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {status === 'loading' && <Loader />}

            {status === 'loaded' && (
              <>
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>
                <PeopleTable people={people} />
              </>
            )}

            {status === 'empty' && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
