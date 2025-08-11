import { PeopleFilters } from './PeopleFilters';
import { useMemo } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useState } from 'react';

import { PeopleContext } from '../store/PeopleContext';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { filterPeople } from '../utils/utilsPiople';

export const PeoplePage = () => {
  const { people, loading, errorMessage, loadPeople } =
    useContext(PeopleContext);

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const params = useMemo(
    () => ({
      query: searchParams.get('query') || '',
      sex: searchParams.get('sex') || '',
      centuries: searchParams.getAll('centuries') || [],
      sort: searchParams.get('sort') || '',
      order: searchParams.get('order') || '',
    }),
    [searchParams],
  );

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  useEffect(() => {
    setFilteredPeople(filterPeople(people, params));
  }, [params, people]);

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
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!loading && !errorMessage && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
