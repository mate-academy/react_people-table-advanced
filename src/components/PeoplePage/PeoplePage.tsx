import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { filterPeople } from '../../utils/filterPeople';

type SortField = 'name' | 'sex' | 'born' | 'died' | undefined;
type OrderField = 'asc' | 'desc' | undefined;

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(
    () =>
      filterPeople(people, {
        sex: searchParams.get('sex') || undefined,
        query: searchParams.get('query') || undefined,
        centuries: searchParams.getAll('centuries'),
        sort: searchParams.get('sort') as SortField,
        order: searchParams.get('order') as OrderField,
      }),
    [people, searchParams],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !error && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && !filteredPeople.length && query && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
