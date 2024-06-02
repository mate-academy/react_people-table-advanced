import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => setPeople(response))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="box table-container">
        {isLoading && <Loader />}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && !hasError && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!!people.length && !isLoading && !hasError && (
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
                // eslint-disable-next-line react/jsx-key
                <PersonLink key={person.born} person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
