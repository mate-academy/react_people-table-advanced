import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setIsVisibleError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filterdPeopleList = getFilteredPeople(
    peopleList,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !!peopleList.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && isVisibleError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !peopleList.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !filterdPeopleList.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isVisibleError && !!filterdPeopleList.length && (
                <PeopleTable peopleList={filterdPeopleList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
