
import { useEffect, useState, useMemo } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';

const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

const getCentury = (year: number) => Math.ceil(year / 100);

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        const byName = new Map(data.map(person => [person.name, person]));

        setPeople(
          data.map(person => ({
            ...person,
            mother: person.motherName
              ? byName.get(person.motherName)
              : undefined,
            father: person.fatherName
              ? byName.get(person.fatherName)
              : undefined,
          })),
        );
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortParam = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const visiblePeople = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (
        centuries.length > 0 &&
        !centuries.includes(String(getCentury(person.born)))
      ) {
        return false;
      }

      if (normalizedQuery) {
        return [person.name, person.motherName, person.fatherName].some(name =>
          name?.toLowerCase().includes(normalizedQuery),
        );
      }

      return true;
    });

    const sortField = SORT_FIELDS.find(field => field === sortParam);

    if (!sortField) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const first = a[sortField];
      const second = b[sortField];

      const result =
        typeof first === 'string' && typeof second === 'string'
          ? first.localeCompare(second)
          : Number(first) - Number(second);

      return isDesc ? -result : result;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, sex, query, centuries.join(','), sortParam, isDesc]);

  const isLoaded = !isLoading && !hasError;
  const hasPeople = isLoaded && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger is-size-5 has-text-weight-semibold"
                >
                  Something went wrong
                </p>
              )}

              {isLoaded && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasPeople && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
