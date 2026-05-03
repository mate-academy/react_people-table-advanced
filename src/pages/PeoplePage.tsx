/* eslint-disable */
import './pages.scss';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const sort = (searchParams.get('sort') || '') as sort;
  const activeCenturies = searchParams.getAll('centuries');
  const order = searchParams.get('order') || '';

  type sort = 'name' | 'sex' | 'born' | 'died' | '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const procededData = data.map(person => ({
          ...person,
          mother: data.find(elem => elem.name === person.motherName),
          father: data.find(elem => elem.name === person.fatherName),
        }));

        setPersons(procededData);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = persons
    .filter(p => {
      if (!query) {
        return true;
      }

      const lowQuery = query.toLowerCase();

      return [p.name, p.motherName, p.fatherName].some(name =>
        name?.toLowerCase().includes(lowQuery),
      );
    })
    .filter(p => {
      return !sex || p.sex === sex;
    })
    .filter(p => {
      if (activeCenturies.length === 0) {
        return true;
      }

      const century = Math.ceil(p.born / 100);

      return activeCenturies.includes(String(century));
    })
    .sort((a, b) => {
      if (!sort) {
        return 0;
      }

      const result = (a[sort] as any) > (b[sort] as any) ? 1 : -1;

      return order === 'desc' ? -result : result;
    });

  return (
    <>
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
        </div>
      </main>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && persons.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isLoading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              <div className="box table-container">
                {isLoading && <Loader />}

                {!isLoading && isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!isLoading && !isError && persons.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!isLoading && !isError && persons.length > 0 && (
                  <PeopleTable persons={visiblePeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
