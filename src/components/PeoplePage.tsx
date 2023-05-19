import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const getData = async () => {
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
      setIsError(true);
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
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <>
            {!isLoading && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              </div>
            )}

            <div className="column">
              <div className="box table-container">
                {isError && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {!people.length && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {isLoading ? (
                  <Loader />
                ) : (
                  <PeopleTable
                    initialPeople={people}
                    searchParams={searchParams}
                  />
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
