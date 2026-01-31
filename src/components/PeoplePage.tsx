import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery) ||
          false ||
          person.fatherName?.toLowerCase().includes(normalizedQuery) ||
          false,
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sort) {
      filtered.sort((person1, person2) => {
        const person1Value = person1[sort as keyof Person];
        const person2Value = person2[sort as keyof Person];

        let result = 0;

        if (
          typeof person1Value === 'number' &&
          typeof person2Value === 'number'
        ) {
          result = person1Value - person2Value;
        }

        if (
          typeof person1Value === 'string' &&
          typeof person2Value === 'string'
        ) {
          result = person1Value.localeCompare(person2Value);
        }

        return order === 'desc' ? -result : result;
      });
    }

    return filtered;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && !error && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : visiblePeople.length === 0 ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={visiblePeople} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {error && !loading && (
        <p data-cy="peopleLoadingError">Something went wrong</p>
      )}
    </>
  );
};
