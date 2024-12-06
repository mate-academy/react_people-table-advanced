import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { getPeopleWithParents, getPreparedPeople } from '../utils/peopleHelper';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [hasMatches, setHasMatches] = useState(true);

  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  const somePeople = isDataLoaded && peopleFromServer.length !== 0;
  const somePeopleHasMatches = somePeople && hasMatches;

  const people = useMemo(
    () => getPeopleWithParents(peopleFromServer),
    [peopleFromServer],
  );

  const visiblePeople = getPreparedPeople(people, {
    sex: searchParams.get('sex') || '',
    query: searchParams.get('query') || '',
    centuries: searchParams.getAll('centuries'),
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') || '',
  });

  useEffect(() => {
    setHasMatches(visiblePeople.length > 0);
  }, [visiblePeople]);

  useEffect(() => {
    setIsDataLoaded(false);
    setisError(false);
    setIsLoading(true);

    getPeople()
      .then(loadedPeople => {
        setPeopleFromServer(loadedPeople);
        setIsDataLoaded(true);
      })
      .catch(() => {
        setisError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {somePeople && (
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

              {isDataLoaded && (
                <>
                  {!somePeople && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!somePeopleHasMatches && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {somePeopleHasMatches && (
                    <PeopleTable people={visiblePeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
