import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../PeopleFilters';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { filteredDataFromServer } from '../../utils/filteredDataFromServer';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const { personSlug = '' } = useParams();

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const currentPeople = await getPeople();

      setPeople(filteredDataFromServer(currentPeople));
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

  const isTableVisible = isFetched && people.length;
  const isTableEmpty = isFetched && !people.length;

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

              <PeopleTable
                people={people}
                personSlug={personSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
