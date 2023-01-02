import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api/api';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const loadedAndNoError = !isLoading && !hasError;
  const thereAreNoPeople = !people.length && loadedAndNoError;
  const thereAreNoFilteredPeople = !filteredPeople.length && loadedAndNoError;
  const thereAreFilteredPeople = !!filteredPeople.length && loadedAndNoError;

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loadedAndNoError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                people={people}
                setFilteredPeople={setFilteredPeople}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {thereAreNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {thereAreNoFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {thereAreFilteredPeople && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
