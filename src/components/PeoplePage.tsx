import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Фільтрація та сортування
  const query = searchParams.get('query')?.toLowerCase().trim() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    // 1. Фільтр за статтю
    if (sex && person.sex !== sex) {
      return false;
    }

    // 2. Фільтр за століттями
    if (centuries.length > 0) {
      const personCentury = Math.ceil(person.born / 100).toString();

      if (!centuries.includes(personCentury)) {
        return false;
      }
    }

    // 3. Фільтр за іменем (name, motherName, fatherName)
    if (query) {
      const nameMatch = person.name.toLowerCase().includes(query);
      const motherMatch =
        person.motherName?.toLowerCase().includes(query) || false;
      const fatherMatch =
        person.fatherName?.toLowerCase().includes(query) || false;

      if (!nameMatch && !motherMatch && !fatherMatch) {
        return false;
      }
    }

    return true;
  });

  // Сортування
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const aValue = a[sort as keyof Person] ?? '';
    const bValue = b[sort as keyof Person] ?? '';

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const result = aValue.localeCompare(bValue);

      return order === 'desc' ? -result : result;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'desc' ? bValue - aValue : aValue - bValue;
    }

    return 0;
  });

  const hasPeople = !loading && !error && people.length > 0;
  const hasNoMatches = hasPeople && sortedPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {/* Сайдбар з'являється лише тоді, коли дані завантажено та є люди */}
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && sortedPeople.length > 0 && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
