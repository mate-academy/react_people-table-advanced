import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { filterPeopleBySearchParams } from '../utils/filterPeople';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => setPeople(response))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();

  const filteredPeople = filterPeopleBySearchParams(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

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

              {!filteredPeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && !isLoading && !hasError && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
