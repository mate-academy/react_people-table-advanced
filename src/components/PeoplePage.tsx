/* eslint-disable max-len */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonHelpers } from '../utils/centuriesHelper';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [centuries, setCenturies] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  const filterParams = {
    centuries: searchParams.getAll('centuries').map(century => Number(century)),
    sex: (searchParams.get('sex') as 'm' | 'f') ?? undefined,
    query: searchParams.get('query') ?? undefined,
  };
  const personList = PersonHelpers.filter(persons, filterParams, {
    sortBy:
      (searchParams.get('sort') as 'name' | 'sex' | 'born' | 'died') ??
      undefined,
    reverse: searchParams.get('order') === 'desc',
  });

  useEffect(() => {
    getPeople()
      .then(people => {
        const centurie: number[] = [];
        const updatedPeople = people.map(person => ({
          ...person,
          father: people.find(p => p.name === person.fatherName),
          mother: people.find(p => p.name === person.motherName),
        }));

        setPersons(updatedPeople);

        people.forEach(person => {
          const cent = Math.floor(person.born / 100) + 1;

          if (!centurie.includes(cent)) {
            centurie.push(cent);
          }
        });
        setCenturies(centurie.sort());
      })
      .catch(() => setError(true))
      .finally(() => setIsLoad(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoad ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters centuries={centuries} />
            </div>

            <div className="column">
              <div className="box table-container">
                {persons.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {persons.length !== 0 && personList.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

                {error ? (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                ) : (
                  <PeopleTable persons={personList} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
