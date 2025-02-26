import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { filterAndSortPeople, linkParents } from '../utils/people';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [peopleData, setPeopleData] = useState<Person[] | null>(null);

  const [searchParams] = useSearchParams();
  const genderFilter = searchParams.get('sex') || '';
  const centuriesFilter = searchParams.getAll('centuries') || [];
  const searchQuery = searchParams.get('query') || '';
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(res => {
        setPeopleData(linkParents(res));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = filterAndSortPeople(
    peopleData,
    genderFilter,
    searchQuery,
    centuriesFilter,
    sortField,
    sortOrder,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleData && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peopleData && !peopleData.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!peopleData && !visiblePeople?.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!hasError && peopleData?.length && !!visiblePeople?.length && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
