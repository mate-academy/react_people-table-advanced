import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person, SearchParam } from '../types';
import { getPeople } from '../api';
import {
  getPreparedPeople,
  getSortedPeople,
  getFilteredPeople,
} from '../utils';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(SearchParam.Sort) ?? '';
  const order = searchParams.get(SearchParam.Order) ?? '';
  const sex = searchParams.get(SearchParam.Sex) ?? '';
  const query = searchParams.get(SearchParam.Query) ?? '';
  const centuries = searchParams.getAll(SearchParam.Centuries) ?? [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromAfar => setPeople(getPreparedPeople(peopleFromAfar)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sortedPeople = useMemo(
    () => getSortedPeople(people, sort, order),
    [people, sort, order],
  );

  const filteredPeople = useMemo(
    () => getFilteredPeople(sortedPeople, sex, query, centuries),
    [sortedPeople, sex, query, centuries],
  );

  const isRequestSuccessful = !isLoading && !isError;
  const hasPeople = !!people.length;
  const hasVisiblePeople = !!filteredPeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isRequestSuccessful && (
                <>
                  {hasPeople && hasVisiblePeople && (
                    <PeopleTable
                      people={filteredPeople}
                      selectedPersonSlug={slug}
                    />
                  )}

                  {hasPeople && !hasVisiblePeople && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!hasPeople && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
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
