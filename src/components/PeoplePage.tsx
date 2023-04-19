import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getFilteredPeople, getPersonParents } from '../helpers';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [serachParams, setSearchParams] = useSearchParams();
  const query = serachParams.get('query') || '';
  const sex = serachParams.get('sex') || '';
  const centuries = serachParams.getAll('centuries') || [];

  const loadPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents: Person[] = peopleFromServer.map(
        person => getPersonParents(person, peopleFromServer),
      );

      setPeople(peopleWithParents);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  const filteredPeople = getFilteredPeople(people, query, sex, centuries);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={serachParams}
              onSetSearchParams={setSearchParams}
              query={query}
              sex={sex}
              centuries={centuries}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {(!isLoading && hasError) && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoading && !hasError && people.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!isLoading && !hasError && filteredPeople.length === 0) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {(!isLoading && !hasError && filteredPeople.length > 0) && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
