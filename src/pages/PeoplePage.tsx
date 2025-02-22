import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';
import { SearchParams } from '../types/Enums';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const activeSex = searchParams.get(SearchParams.Sex);
  const filterQuery = searchParams.get(SearchParams.Query);
  const activeSort = searchParams.get(SearchParams.Sort);
  const isDesc = searchParams.get(SearchParams.Order);
  const activeCenturies = searchParams.getAll(SearchParams.Centuries);

  const loadPeople = () => {
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = getPeopleWithParents(peopleFromServer);

        setPeople(preparedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const filteredPeople = getPreparedPeople(
    people,
    activeSex,
    filterQuery,
    activeCenturies,
    activeSort,
    isDesc,
  );

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!hasError && !isLoading && (
              <PeopleFilters
                activeSex={activeSex}
                filterQuery={filterQuery}
                activeCenturies={activeCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!hasError && !isLoading && (
                <PeopleTable
                  people={filteredPeople}
                  activeSort={activeSort}
                  isDesc={isDesc}
                />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
