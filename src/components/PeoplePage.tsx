import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc';
type SortState = { field: SortField; order: SortOrder } | null;

const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

function getSortState(searchParams: URLSearchParams): SortState {
  const sort = searchParams.get('sort');

  if (!sort || !SORT_FIELDS.includes(sort as SortField)) {
    return null;
  }

  const order = searchParams.get('order');

  return {
    field: sort as SortField,
    order: order === 'desc' ? 'desc' : 'asc',
  };
}

function getComparableValue(person: Person, field: SortField) {
  switch (field) {
    case 'name':
      return person.name.toLowerCase();
    case 'sex':
      return person.sex.toLowerCase();
    case 'born':
      return person.born;
    case 'died':
      return person.died;
    default:
      return '';
  }
}

function sortPeople(people: Person[], sortState: SortState) {
  if (!sortState) {
    return people;
  }

  const { field, order } = sortState;

  return [...people].sort((firstPerson, secondPerson) => {
    const firstValue = getComparableValue(firstPerson, field);
    const secondValue = getComparableValue(secondPerson, field);

    if (firstValue < secondValue) {
      return order === 'asc' ? -1 : 1;
    }

    if (firstValue > secondValue) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });
}

function matchesQuery(query: string | null, person: Person) {
  if (!query) {
    return true;
  }

  return [person.name, person.motherName, person.fatherName].some(value =>
    value?.toLowerCase().includes(query),
  );
}

function filterPeople(people: Person[], searchParams: URLSearchParams) {
  const query = searchParams.get('query')?.trim().toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  return people.filter(person => {
    const matchesQueryField = matchesQuery(query, person);
    const matchesSex = sex ? person.sex === sex : true;
    const matchesCenturies = centuries.length
      ? centuries.includes(String(Math.ceil(person.born / 100)))
      : true;

    return matchesQueryField && matchesSex && matchesCenturies;
  });
}

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        if (!isMounted) {
          return;
        }

        setPeople(data);
        setIsLoaded(true);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setHasError(true);
        setIsLoaded(false);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const sortState = useMemo(() => getSortState(searchParams), [searchParams]);

  const visiblePeople = useMemo(() => {
    const filteredPeople = filterPeople(people, searchParams);

    return sortPeople(filteredPeople, sortState);
  }, [people, searchParams, sortState]);

  const showFilters = isLoaded && !hasError;
  const hasNoMatchingPeople =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
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

              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sortField={sortState?.field ?? null}
                  sortOrder={sortState?.order ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
