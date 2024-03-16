/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { PeopleFilters } from '../PeopleFilters';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { FilterParams, Person, SortParams } from '../../types';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setPeopleLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const filters = {
      sex: searchParams.get(FilterParams.Sex),
      name: searchParams.get(FilterParams.Query),
      centuries: searchParams.getAll(FilterParams.Centuries),
    };

    return getFilteredPeople(people, filters);
  }, [people, searchParams]);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(
      filteredPeople,
      searchParams.get(SortParams.Sort),
      searchParams.get(SortParams.Order),
    );
  }, [filteredPeople, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!!people.length && !peopleLoadingError && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {peopleLoadingError && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !peopleLoadingError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPeople.length && !peopleLoadingError && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPeople.length && !peopleLoadingError && !isLoading && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
