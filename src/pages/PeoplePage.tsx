import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { preparePeople } from '../helpers/preparePeople';

import { Person } from '../types';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPreparedPeople } from '../helpers/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const visiblePeople = getPreparedPeople(people, {
    sort, order, sex, query, centuries,
  });

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => setPeople(preparePeople(peopleFromServer)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
              {isLoading && (
                <Loader />
              )}

              {(isError && !isLoading) && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!visiblePeople.length && !isLoading) ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                (!!people.length && !isLoading) && (
                  <PeopleTable
                    people={visiblePeople}
                  />
                )
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
