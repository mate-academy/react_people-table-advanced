import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { SinglePerson } from './Person';
import { PeopleFilters } from './PeopleFilters';

export const People = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const longClassName = 'table is-striped is-hoverable is-narrow is-fullwidth';

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error !== '' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <table
                  data-cy="peopleTable"
                  className={longClassName}
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
                    {people.map(person => {
                      return (
                        <SinglePerson
                          people={people}
                          person={person}
                          key={person.slug}
                        />
                      );
                    })}

                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
