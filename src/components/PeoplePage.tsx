import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleList } from './PeopleList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(getPreparedPeople(data));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isPeopleOnServer = !!people.length && !isError;
  const isNoPeopleOnServer = !people.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isPeopleOnServer && (
              <PeopleFilters />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isPeopleOnServer && (
                <PeopleList people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
