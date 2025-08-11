import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrror] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleData = async () => {
    setIsLoading(true);
    try {
      const peopleData = await getPeople();
      const peopleWithParents = peopleData.map(person => {
        const father = peopleData.find(guy => person.fatherName === guy.name);
        const mother = peopleData.find(
          woman => person.motherName === woman.name,
        );

        return {
          ...person,
          father: father,
          mother: mother,
        };
      });

      setPeople(peopleWithParents);
    } catch {
      setErrror(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleData();
  }, []);

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
