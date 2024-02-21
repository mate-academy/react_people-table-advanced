import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // const { pathname, search } = useLocation();

  return (
    <>
      <h1 className="title">People Page</h1>
      {/* <p>pathname: {pathname}</p>
      <p>search:{search}</p> */}
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !isLoading && !isLoadingError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
