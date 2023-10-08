import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonItem } from './PersonItem';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((response) => setPeople(response))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
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
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonItem
                  person={person}
                  key={person.slug}
                  people={people}
                />
              ))}

            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};
