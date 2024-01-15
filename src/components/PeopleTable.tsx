import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople, matchParents } from '../utils';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(false);

      try {
        setIsLoading(true);
        const response = await getPeople();
        const peopleWithParents = matchParents(response as Person[]);

        setPeople(peopleWithParents);
      } catch (error) {
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {showError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people !== null && !people.length && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {/* <p>There are no people matching the current search criteria</p> */}

        {
          people !== null && people.length > 0 && (
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
                {
                  people.map(person => (
                    <PersonLink key={person.slug} person={person} />
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
};
