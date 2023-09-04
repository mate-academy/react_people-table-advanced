import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types/Person';

const peopleWithParents = (peopleArray: Person[]): Person[] => {
  return peopleArray.map((person) => {
    const mother = peopleArray.find((pr) => pr.name === person.motherName);
    const father = peopleArray.find((pr) => pr.name === person.fatherName);

    return { ...person, mother, father };
  });
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleArray) => setPeople(peopleWithParents(peopleArray)))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length === 0 && !error && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {people.length > 0 && (
                    <PeopleTable people={people} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
