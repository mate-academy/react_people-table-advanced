import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { getPreparedPeople } from '../helpers/getPreparedPeople';
import { preparePeople } from '../helpers/preparePeople';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const visiblePeople = getPreparedPeople(people, {
    sort, order, sex, query, centuries: centuries.join(','),
  });

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(peopleFromServer => setPeople(preparePeople(peopleFromServer)))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">

        {!isLoading && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {isLoading && (<Loader />)}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !error && !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!isLoading && !error && !!people.length && (
              <PeopleTable people={visiblePeople} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
