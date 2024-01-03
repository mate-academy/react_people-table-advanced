import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { getPreparedPeople } from '../../helpers/getPreparedPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const filters = {
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
    sex: searchParams.get('sex'),
    query: searchParams.get('query') || '',
    centuries: searchParams.getAll('centuries') || [],
  };

  const hasAbleToRender = (!isLoading && !hasError && !!people.length);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleToRender = getPreparedPeople(people, filters);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !people.length && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!peopleToRender.length && hasAbleToRender && (
                <p>There are no people matching the current search criteria</p>
              )}

              {
                hasAbleToRender
                && peopleToRender.length > 0
                && <PeopleTable people={peopleToRender} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
