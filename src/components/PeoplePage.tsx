import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { filter } from '../utils/getFilterPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const getFilteredPeople = filter(people, searchParams);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}
                  {!people.length && !isError && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
              {!isLoading && !getFilteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading && !isError && !!getFilteredPeople.length && (
                <PeopleTable people={getFilteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
