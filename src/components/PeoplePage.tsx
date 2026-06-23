import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getPreparedPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  const isLoaded = !isLoading && !hasError;
  const noPeopleOnServer = isLoaded && people.length === 0;
  const showContent = isLoaded && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showContent && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {showContent && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {showContent && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}{' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
