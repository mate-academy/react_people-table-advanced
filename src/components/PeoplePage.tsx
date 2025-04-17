/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  const sort = searchParams.get('sort');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (aValue > bValue) {
        return order === 'desc' ? -1 : 1;
      }

      if (aValue < bValue) {
        return order === 'desc' ? 1 : -1;
      }

      return 0;
    });
  }

  const filterPeople = sortedPeople.filter(person => {
    const filteredBySex = sex ? person.sex === sex : true;
    const bornInCentury = Math.floor(person.born / 100) + 1;
    const filterByCentury = centuries.length
      ? centuries.includes(String(bornInCentury))
      : true;
    const filterByQuery = query
      ? [person.name, person.fatherName, person.motherName].some(
          name => name && name.toLowerCase().includes(query.toLowerCase()),
        )
      : true;

    return filteredBySex && filterByCentury && filterByQuery;
  });

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="box table-container">
            {isLoading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!isLoading &&
              !error &&
              people.length === 0 &&
              !query &&
              !sex &&
              centuries.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            {!isLoading && !error && filterPeople.length > 0 && (
              <PeopleTable people={filterPeople} slug={slug} />
            )}
            {!isLoading && !error && !filterPeople.length && (
              <p>There are no people matching the current search criteria</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
