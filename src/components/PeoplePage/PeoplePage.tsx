import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeopleWithParents } from '../../api';

import {
  sexParam,
  centuriesParam,
  queryParam,
  sortParam,
  orderParam,
} from '../../common/constants';

import { PeopleFilter } from '../PeopleFilter';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

import { Person } from '../../types/Person';
import { orderPeople } from '../../common/helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [searchParams] = useSearchParams();

  const filteredPeople = orderPeople(
    people,
    searchParams.get(sexParam) || '',
    searchParams.get(queryParam) || '',
    searchParams.getAll(centuriesParam),
    searchParams.get(sortParam) || '',
    searchParams.get(orderParam) || '',
  );

  useEffect(() => {
    setIsInitialized(true);

    getPeopleWithParents()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isLoadSuccess = !isLoading && !hasError && isInitialized;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilter />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {isLoadSuccess && !people.length && (
                <p
                  data-cy="noPeopleMessage"
                  className="has-text-centered has-text-weight-bold"
                >
                  There are no people on the server
                </p>
              )}

              {isLoadSuccess && !filteredPeople.length && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {isLoadSuccess && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
