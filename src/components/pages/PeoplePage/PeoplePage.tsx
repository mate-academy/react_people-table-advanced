import { useEffect, useState } from 'react';
import { Person } from '../../../types';
import { getPeople } from '../../../api';
import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable/PeopleTable';
import { PeopleFilters } from '../../PeopleFilters';

function preparePeople(people: Person[]) {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(preparePeople(peopleFromServer));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isDisplayError = isError && !isLoading;
  const isNoPeopleFromServer = !people.length && !isLoading && !isError;
  const isPeopleFromServer = !!people.length && !isError;

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
              {isLoading && (
                <Loader />
              )}

              {isDisplayError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleFromServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleFromServer && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
