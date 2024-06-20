import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const onFilter = (fp: Person[]) => {
    setFilteredPeople(fp);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(loadedPeople => {
        const lPeople = loadedPeople.map(person => {
          const personMother = loadedPeople.find(
            currentPerson => currentPerson.name === person.motherName,
          );
          const personFather = loadedPeople.find(
            currentPerson => currentPerson.name === person.fatherName,
          );

          return { ...person, mother: personMother, father: personFather };
        });

        setPeople(lPeople);
        setFilteredPeople(lPeople);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters people={people} onFilter={onFilter} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {Boolean(people.length) && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
