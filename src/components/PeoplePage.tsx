import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const onFilter = (filterPeople: Person[]) => {
    setFilteredPeople(filterPeople);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople()
      .then(persons =>
        persons.map(person => ({
          ...person,
          mother: persons.find(mother => mother.name === person.motherName),
          father: persons.find(father => father.name === person.fatherName),
        })),
      )
      .then(setPeoples)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters people={peoples} onFilter={onFilter} />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !isLoading && !peoples.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!!peoples.length && <PeopleTable persons={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
