import {
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople } from '../services/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuryParams = searchParams.getAll('centuries') || [];

  const filteredPeople = filterPeople(
    people,
    query,
    sex,
    centuryParams,
  );

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleFilterBlock = !isLoading && !hasError && !!people.length;

  const peopleAbsenceMsg = !isLoading && !hasError && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {peopleFilterBlock
          && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">

            {isLoading && <Loader />}

            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {peopleAbsenceMsg && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!!people.length && !filteredPeople.length
              && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

            {!!people.length && !!filteredPeople.length && (
              <PeopleTable people={filteredPeople} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
