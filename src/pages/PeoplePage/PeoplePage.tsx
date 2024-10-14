import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters, Loader, PeopleTable } from '../../components';

import { Person, SearchParams } from '../../types';

import { getPeople } from '../../api';
import { getVisiblePeople } from '../../utils/getVisibleFilter';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, serIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.QUERY);
  const sex = searchParams.get(SearchParams.SEX);
  const century = searchParams.getAll(SearchParams.CENTURY);
  const sort = searchParams.get(SearchParams.SORT);
  const order = searchParams.get(SearchParams.ORDER);

  const visiblePeople = getVisiblePeople(
    people,
    query,
    sex,
    century,
    sort,
    order,
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => setPeople(getPreparedPeople(response)))
      .catch(() => serIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && visiblePeople.length !== 0 && (
                <PeopleTable people={visiblePeople} sort={sort} order={order} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
