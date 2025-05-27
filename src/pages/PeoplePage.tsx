import React from 'react';
import { useState, useEffect } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const filteredPeople = filterPeople(people, searchParams);

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then(response => {
        const newPeople = response.map(person => {
          const mother = response.find(mom => mom.name === person.motherName);
          const father = response.find(dad => dad.name === person.fatherName);

          return { ...person, mother, father };
        });

        setPeople(newPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoad(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoad && !isError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoad && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoad && people.length === 0 && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoad && !isError && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
