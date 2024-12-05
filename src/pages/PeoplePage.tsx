// #region imports
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { getPeopleFiltered } from '../utils/getPeopleFiltered';
import { Person } from '../types';
// #endregion

export const PeoplePage = () => {
  // #region hooks
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);
  // #endregion

  // #region people filtering
  const [searchParams] = useSearchParams();
  const filterParams = {
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
    centuries: searchParams.getAll('centuries'),
  };

  const filteredPeople = getPeopleFiltered(people, filterParams);
  // #endregion

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && !!people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !isError &&
                (!people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : !filteredPeople.length ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable people={filteredPeople} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
