import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getSortedPeople } from '../utils/getSortedPeople';
import { getPeopleWithParents } from '../helpers';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoadingError, setHasLoadingError] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = getFilteredPeople(people, query, centuries, sex);

  const sortedPeople = getSortedPeople(filteredPeople, sortBy, order);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromApi: Person[]) =>
        setPeople(getPeopleWithParents(peopleFromApi)),
      )
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!people.length && !!searchParams.keys.length && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!!people.length && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
