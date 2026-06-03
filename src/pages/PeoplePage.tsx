import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { People } from '../components/People';
import { useVisiblePeople } from '../hooks/useVisiblePeople';
import { PeopleFilters } from '../components/PeopleFilters';

function findParent(data: Person[] | null, name: string | null): Person | null {
  if (!data || !name) {
    return null;
  }

  return data.find(person => person.name === name) ?? null;
}

function preparePeople(people: Person[]) {
  return people.map(person => ({
    ...person,
    mother: findParent(people, person.motherName),
    father: findParent(people, person.fatherName),
  }));
}

export const PeoplePage: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const people = useVisiblePeople(data);
  const hasNoFilteredPeople =
    !isLoading && !error && data.length > 0 && people.length === 0;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(res => {
        setData(preparePeople(res));
      })
      .catch(() => {
        setError('Something went wrong');
      })
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
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {hasNoFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && !hasNoFilteredPeople && (
                <People people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
