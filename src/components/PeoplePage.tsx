import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { getCentury } from '../utils/getCentury';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(peopleData => {
        const peopleWithParents = peopleData.map(person => ({
          ...person,
          mother: peopleData.find(p => p.name === person.motherName),
          father: peopleData.find(p => p.name === person.fatherName),
        }));

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const hasPeople = !loading && people.length > 0 && !error;
  const visiblePeople = useMemo(() => {
    let filteredPeople = [...people];

    if (query) {
      const normalizedQuery = query.toLowerCase();

      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(normalizedQuery)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(normalizedQuery)),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const personCentury = getCentury(person.born);

        if (!personCentury) {
          return false;
        }

        return centuries.includes(personCentury.toString());
      });
    }

    if (sort) {
      filteredPeople.sort((a, b) => {
        const fieldA = a[sort as keyof Person];
        const fieldB = b[sort as keyof Person];

        // Rule: nulls/undefined are considered "greater" and go to the end in ascending sort
        if (fieldA == null && fieldB == null) {
          return 0; // Both are null/undefined, treat as equal
        }
        if (fieldA == null) {
          return 1; // a is null, so it's "greater"
        }
        if (fieldB == null) {
          return -1; // b is null, so it's "greater"
        }

        // Now we know values are not null, proceed with typed comparison
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return fieldA.localeCompare(fieldB);
        }

        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return fieldA - fieldB;
        }

        return 0;
      });

      if (order === 'desc') {
        filteredPeople.reverse();
      }
    }

    return filteredPeople;
  }, [people, query, sex, centuries, sort, order]);

  const hasPeople = people.length > 0 && !error;
  const noResults = hasPeople && !loading && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                people={people}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noResults && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
