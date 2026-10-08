import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

function getVisiblePeople(people: Person[], searchParams: URLSearchParams) {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.trim().toLowerCase();
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  let result = [...people];

  if (sex) {
    result = result.filter(person => person.sex === sex);
  }

  if (query) {
    result = result.filter(({ name, motherName, fatherName }) =>
      [name, motherName, fatherName].some(value =>
        value?.toLowerCase().includes(query),
      ),
    );
  }

  if (centuries.length > 0) {
    result = result.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (sort) {
    result.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);
        case 'born':
        case 'died':
          return a[sort] - b[sort];
        default:
          return 0;
      }
    });

    if (isDesc) {
      result.reverse();
    }
  }

  return result;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () => getVisiblePeople(people, searchParams),
    [people, searchParams],
  );

  const isLoaded = !isLoading && !hasError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
