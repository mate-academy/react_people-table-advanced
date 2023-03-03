import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
}
  from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug = '' } = useParams();

  const noError = !isLoading && !hasError;
  const noPeople = !people.length && noError;
  const noFilteredPeople = !people.length && noError;
  const thereAreFilteredPeople = !!people.length && noError;

  const fetchPeople = useCallback(async () => {
    try {
      let data = await getPeople();

      data = getPreparedPeople(data);
      setPeople(data);
      setIsLoading(false);
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
          {noError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
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

              {noPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noFilteredPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {thereAreFilteredPeople && (
                <PeopleTable
                  people={people}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
