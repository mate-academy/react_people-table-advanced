import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';
import { Search } from '../types/Search';
import { getPeople } from '../api';

import { filteredList } from '../utils/filteredList';
import { sortedList } from '../utils/sortedList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState(false);
  const [searchParams] = useSearchParams();

  const sexParams = searchParams.get(Search.sex);
  const centuriesParams = searchParams.getAll(Search.centuries);
  const queryParams = searchParams.get(Search.query);
  const sortParams = searchParams.get(Search.sort);
  const orderParams = searchParams.get(Search.order);

  const orderedPeople = useMemo(() => {
    return filteredList(
      sortedList(people, orderParams, sortParams),
      sexParams,
      queryParams,
      centuriesParams,
    );
  }, [people, searchParams]);

  const handleResponse = (resp: Person[]) => {
    setIsLoading(false);
    if (isErrorResponse) {
      setIsErrorResponse(false);
    }

    setPeople(resp);
  };

  useEffect(() => {
    getPeople()
      .then((response) => handleResponse(response))
      .catch(() => setIsErrorResponse(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isLoaded = !isLoading && !isErrorResponse;
  const isNoPeopleOnServer = isLoaded && !people.length;
  const isNoPeopleMatch = isLoaded && !orderedPeople.length;
  const isPeopleTable = isLoaded && !isNoPeopleMatch && !isNoPeopleOnServer;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorResponse && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoPeopleMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isPeopleTable && (
                <PeopleTable
                  orderedPeople={orderedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
