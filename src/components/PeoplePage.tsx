import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(human => {
        setPeople(human);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filteredPeople = people
    .filter(person => {
      if (query) {
        const nameMatch = person.name.toLowerCase().includes(query);
        const motherMatch = person.motherName?.toLowerCase().includes(query);
        const fatherMatch = person.fatherName?.toLowerCase().includes(query);

        if (!(nameMatch || motherMatch || fatherMatch)) {
          return false;
        }
      }

      if (sex && person.sex !== sex) {
        return false;
      }

      if (centuries.length > 0) {
        const bornCentury = Math.floor(person.born / 100) + 1;

        if (!centuries.includes(String(bornCentury))) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const fieldA = a[sortField as keyof Person];
      const fieldB = b[sortField as keyof Person];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'desc'
          ? fieldB.localeCompare(fieldA)
          : fieldA.localeCompare(fieldB);
      }

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortOrder === 'desc' ? fieldB - fieldA : fieldA - fieldB;
      }

      return 0;
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                filteredPeople.length > 0 && (
                  <PeopleTable humans={filteredPeople} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
