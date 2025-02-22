import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getSortedPeople } from '../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const filters = {
      sex: searchParams.get('sex'),
      name: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
    };

    return getFilteredPeople(filters, people);
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    return getSortedPeople(filteredPeople, sort, order);
  }, [searchParams, filteredPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && !isLoading && !hasError && (
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
              {!people.length && !isLoading && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!filteredPeople.length && !isLoading && !hasError && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!!filteredPeople.length && !isLoading && !hasError && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
