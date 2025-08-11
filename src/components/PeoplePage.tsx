import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeopleContext = React.createContext<Person[]>([]);

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const sexSearchParam = searchParams.get('sex');
  const querySearchParam = searchParams.get('query');
  const centuriesSearchParam = searchParams.getAll('centuries');
  const sortSearchParam = searchParams.get('sort');
  const orderSearchParam = searchParams.get('order');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = getFilteredPeople(people, {
    sex: sexSearchParam,
    query: querySearchParam,
    centuries: centuriesSearchParam,
    sort: sortSearchParam,
    order: orderSearchParam,
  });

  return (
    <PeopleContext.Provider value={people}>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && !loading && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && !loading && !error && (
                <PeopleTable visiblePeople={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </PeopleContext.Provider>
  );
};
