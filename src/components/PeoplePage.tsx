import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('century');
  const rawSort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sort =
    rawSort === 'name' ||
    rawSort === 'sex' ||
    rawSort === 'born' ||
    rawSort === 'died'
      ? rawSort
      : null;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    //  Name filter
    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query),
      );
    }

    // 🕰 Century filter
    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    // Sorting
    if (sort) {
      result.sort((a, b) => {
        const valueA = a[sort];
        const valueB = b[sort];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        }

        return 0;
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, query, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!isLoading && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
