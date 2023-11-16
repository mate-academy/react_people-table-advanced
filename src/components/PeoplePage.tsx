import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [getpeople, setGetPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const [preparedPeople, setPreparedPeople] = useState([...getpeople]);
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        if (!people.length) {
          setError('There are no people on the server');
        }

        setGetPeople(people);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              centuries={centuries}
              preparedPeople={preparedPeople}
              getpeople={getpeople}
              setPreparedPeople={setPreparedPeople}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}
              {!!error && (
                <>
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                  {getpeople.length <= 0 && (
                    <p data-cy="noPeopleMessage">
                      {error}
                    </p>
                  )}
                </>
              )}

              <p>There are no people matching the current search criteria</p>
              {getpeople.length > 0 && !isLoading && (
                <PeopleTable
                  getpeople={getpeople}
                  // searchParams={searchParams}
                  preparedPeople={preparedPeople}
                  setPreparedPeople={setPreparedPeople}
                  sort={sort}
                  order={order}
                  centuries={centuries}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
