import { useEffect, useState } from 'react';
import * as peopleService from '../api';
import { useSearchParams } from 'react-router-dom';

import { Loader, PeopleTable, PeopleFilters } from '../components';
import { Person } from '../types';
import { findParents, getFilteredPeople } from '../utils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  const loadPeople = () => {
    peopleService
      .getPeople()
      .then(res => {
        const peopleWithParents = findParents(res);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  const filteredPeople = getFilteredPeople(people, {
    sex,
    query,
    centuries,
    order,
    sort,
  });

  useEffect(loadPeople, []);

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

              {!isLoading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && !errorMessage && people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !errorMessage && people?.length !== 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
