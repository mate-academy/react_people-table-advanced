import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader/Loader';
import { PeopleFilters } from '../components/filters/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = getPreparedPeople(people, searchParams);

  const noPeopleOnServer = !isLoading && !hasError && people.length === 0;
  const noMatches =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length > 0 && (
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

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
