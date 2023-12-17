import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = people.map(person => {
    const newPerson = { ...person };

    if (person.motherName) {
      newPerson.mother = people.find(pers => pers.name === person.motherName);
    }

    if (person.fatherName) {
      newPerson.father = people.find(pers => pers.name === person.fatherName);
    }

    return newPerson;
  });

  const [peopleForShowing, setPeopleForShowing] = useState(peopleWithParents);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading
            && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters
                  setPeople={setPeopleForShowing}
                  people={peopleWithParents}
                />
              </div>
            )}

          <div className="column">
            <div className="box table-container">
              {isLoading
                && <Loader />}

              {error
                && (
                  <p data-cy="peopleLoadingError">
                    Something went wrong
                  </p>
                )}

              {!people.length && !error && !isLoading
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!peopleForShowing.length
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {(!!peopleForShowing.length && !isLoading)
                && (
                  <PeopleTable
                    people={peopleForShowing}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
