import { useEffect, useState } from 'react';
import React from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../types/Sex';
import { Century } from '../types/Century';
import { SortedFields } from '../types/SortedFields';

const getPreparedPeople = (
  people: Person[],
  query: string | null,
  sex: Sex | null,
  centuries: Century[],
  field: SortedFields | null,
  order: 'desc' | null,
) => {
  let newPeople = [...people];

  if (query) {
    const lowerQuery = query.toLowerCase();

    newPeople = newPeople.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery),
    );
  }

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    newPeople = newPeople.filter(person => {
      const personCentury = Math.ceil(person.born / 100).toString() as Century;

      return centuries.includes(personCentury);
    });
  }

  if (field) {
    newPeople.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'desc'
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'desc' ? bVal - aVal : aVal - bVal;
      }

      return 0;
    });
  }

  return newPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  const sexParam = searchParams.get('sex');
  const sex = sexParam === Sex.M || sexParam === Sex.F ? sexParam : null;

  const preparedPeople = getPreparedPeople(
    people,
    searchParams.get('query'),
    sex,
    searchParams.getAll('centuries') as Century[],
    sortField as SortedFields,
    sortOrder as 'desc' | null,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : preparedPeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
