import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { getExtendedPersonList } from '../utils/getExtendedPersonList';
import { getVisiblePersonList } from '../utils/getVisiblePersonList';

export const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentFilter = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePersonList = getVisiblePersonList(data, {
    query: currentQuery,
    filterStatus: currentFilter,
    centuries: selectedCenturies,
    sort: sortBy,
    order,
  });

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => setData(getExtendedPersonList(response)))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isEmptyList = !data.length && !hasError;

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
              {isLoading ? (
                <Loader></Loader>
              ) : (
                <>
                  {hasError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {isEmptyList && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!isEmptyList && !visiblePersonList.length && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {!isEmptyList && <PeopleTable data={visiblePersonList} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
