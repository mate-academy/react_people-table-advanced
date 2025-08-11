import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer.find(personToFind => {
              return person.motherName === personToFind.name;
            }),
            father: peopleFromServer.find(personToFind => {
              return person.fatherName === personToFind.name;
            }),
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isError && !!people.length && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
