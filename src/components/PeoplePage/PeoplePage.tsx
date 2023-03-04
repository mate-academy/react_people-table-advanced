import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { prepareVisiblePeople } from '../../utils/prepareVisiblePeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query');
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const { slug = '' } = useParams();

  const isPeople = !isLoading && !hasError && people.length > 0;
  const isEmptyTable = !isLoading && !hasError && people.length === 0;

  const fetchPeople = useCallback(async () => {
    try {
      setHasError(false);

      const data = await getPeople();

      setPeople(data);

      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  const visiblePeople = prepareVisiblePeople(
    people,
    currentQuery,
    currentSex,
    currentCenturies,
    currentSort,
    currentOrder,
  );

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
              {isLoading && <Loader /> }

              {isPeople && (
                <PeopleTable people={visiblePeople} slug={slug} />
              )}

              {isEmptyTable && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
