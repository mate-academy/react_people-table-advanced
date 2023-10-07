import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { FilterSortPeople } from '../utils/FilterSortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = FilterSortPeople(people, searchParams);

  const isDisplayErrorMessage = isError && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !isError;
  const isPeopleDisplayed = !isLoading && !!visiblePeople.length && !isError;
  const isNoPeopleDisplayed = !isLoading && !visiblePeople.length && !isError;

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

              {isDisplayErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoPeopleDisplayed && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isPeopleDisplayed && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
