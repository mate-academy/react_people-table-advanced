import React, {
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage:React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const isTableVisible = isFetched && people.length;
  const isTableEmpty = isFetched && !people.length;

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const responsePeople = await getPeople();

      setPeople(responsePeople);
      setIsFetched(true);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isTableVisible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isTableEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              <PeopleTable people={people} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
