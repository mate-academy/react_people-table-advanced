import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { ErrorType } from '../utils/ErrorType';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  const getData = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents: Person[] = peopleFromServer.map(person => {
        const mother = peopleFromServer
          .find(({ name }) => name === person.motherName);
        const father = peopleFromServer
          .find(({ name }) => name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithParents);
    } catch {
      setError(ErrorType.DataLoadingError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters setPeople={setPeople} />
              </div>

              <div className="column">
                <div className="box table-container">
                  {!!error.length && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!people.length && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {/* <p>There are no people matching the current search criteria</p> */}

                  <PeopleTable people={people} />
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};
