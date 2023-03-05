import { useState, useEffect } from 'react';
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
  const [orderedPeople, setOrderedPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();

  const handleResponse = (resp: Person[]) => {
    setIsLoading(false);
    if (isErrorResponse) {
      setIsErrorResponse(false);
    }

    setPeople(resp);
    setOrderedPeople(resp);
  };

  useEffect(() => {
    getPeople()
      .then((response) => handleResponse(response))
      .catch(() => setIsErrorResponse(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const sex = searchParams.get(Search.sex);
    const centuries = searchParams.getAll(Search.centuries);
    const query = searchParams.get(Search.query);
    const sort = searchParams.get(Search.sort);
    const order = searchParams.get(Search.order);

    setOrderedPeople(
      filteredList(
        sortedList(people, order, sort),
        sex,
        query,
        centuries,
      ),
    );
  }, [searchParams]);

  const isNoPeopleOnServer = !isLoading && !people.length && !isErrorResponse;
  const isNoPeopleMatch
  = !isLoading && !orderedPeople.length && !isErrorResponse;
  const isLoaded = !isLoading && !isErrorResponse;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isErrorResponse && (
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

              {isLoaded && (
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
