/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { sortPeople } from '../utils/sortPeople';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => {
        const finalPeople = response.map(person => {
          const mother = response.find(m => m.name === person.motherName);
          const father = response.find(f => f.name === person.fatherName);
          const finalperson = { ...person };

          if (mother) {
            finalperson.mother = mother;
          }

          if (father) {
            finalperson.father = father;
          }

          return finalperson;
        });

        setPeople(finalPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filter = searchParams.get('sex') || null;
  const query = searchParams.get('query')?.toLowerCase() || null;
  const sortType = searchParams.get('sort') as keyof Person || null;
  const order = searchParams.get('order') || null;
  const centuries = searchParams.getAll('centuries').join(',') || '';

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    let changes = false;
    let filtered = [...people];

    if (filter || query || centuries) {
      filtered = filterPeople({
        filtered, filter, query, centuries,
      });

      changes = true;
    }

    if (sortType) {
      filtered = sortPeople({ filtered, sortType, order });

      changes = true;
    }

    if (changes) {
      setFilteredPeople(filtered);

      return;
    }

    setFilteredPeople(people);
  }, [people, filter, query, sortType, centuries, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !isLoading ? (
                <p>
                  There are no people matching the current search criteria
                </p>
              ) : (
                !isLoading ? (
                  <PeopleTable filteredPeople={filteredPeople} />
                ) : null
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
