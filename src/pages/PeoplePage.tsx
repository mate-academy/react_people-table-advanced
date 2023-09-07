import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getFilteredPeople } from '../utils/filteredPeople';
import { getSortedPeople } from '../utils/sortedPeople';

import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeoples] = useState<Person[]>([]);
  const [isVisiblePeople, setIsVisiblePeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = (searchParams.getAll('centuries') || [])
    .map(num => +num);
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(res => {
        setPeoples(res);
        setIsVisiblePeople(getSortedPeople(getFilteredPeople(
          res, query, sex, centuries,
        ), sort, order));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const filteredPeople = getFilteredPeople(people, query, sex, centuries);

    setIsVisiblePeople(getSortedPeople(filteredPeople, sort, order));
  }, [searchParams]);

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
              {isLoading ? <Loader /> : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {!isError && people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!isError && isVisiblePeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  <PeopleTable peoples={isVisiblePeople} />
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
