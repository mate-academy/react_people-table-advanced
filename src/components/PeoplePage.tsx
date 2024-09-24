import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const calculateCentury = (bornYear: number): number => {
    return Math.floor((bornYear - 1) / 100) + 1;
  };

  useEffect(() => {
    const sexFilter = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase() || '';
    const centuryFilter = searchParams.getAll('century');
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    const filteredBySex = sexFilter
      ? people.filter(person => person.sex === sexFilter)
      : people;

    const searchInNames = (person: Person) => {
      const lowerCaseQuery = query.toLowerCase();
      const namesToSearch = [person.name, person.motherName, person.fatherName];

      return namesToSearch.some(
        name => name && name.toLowerCase().includes(lowerCaseQuery),
      );
    };

    const filteredByQuery = query
      ? filteredBySex.filter(person => searchInNames(person))
      : filteredBySex;

    let filteredByCentury = filteredByQuery;

    if (centuryFilter.length > 0) {
      filteredByCentury = filteredByQuery.filter(person => {
        const personCentury = calculateCentury(person.born);

        return centuryFilter.includes(personCentury.toString());
      });
    }

    const sortedPeople = [...filteredByCentury].sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const fieldA = a[sortField as keyof Person];
      const fieldB = b[sortField as keyof Person];

      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortOrder === 'desc' ? fieldB - fieldA : fieldA - fieldB;
      }

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'desc'
          ? fieldB.localeCompare(fieldA)
          : fieldA.localeCompare(fieldB);
      }

      return 0;
    });

    setFilteredPeople(sortedPeople);
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && !!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}

              {!loading && !error && !filteredPeople.length && (
                <p data-cy="noMatchingPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
