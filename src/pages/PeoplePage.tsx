import { useEffect, useState } from 'react';
import { getPeople } from '../services/api';
import { getPeopleWithParents } from '../utils/utils';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPeople();

        setPeople(getPeopleWithParents(res));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const isResOK = isLoaded && !isError;
  const isData = isResOK && people.length;
  const noData = isResOK && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoaded && <Loader />}

              {isError && isLoaded && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noData && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server.
                </p>
              )}

              {isData && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
