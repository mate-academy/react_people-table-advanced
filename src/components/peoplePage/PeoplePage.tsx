import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { getFilteredPeople } from '../../utils/getFilterePeople';
import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';
import { getSortedPeople } from '../../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '');
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex' || '');

  const sort = searchParams.get('sort' || '');
  const order = searchParams.get('order' || '');

  const filteredPeople = useMemo(() => {
    return getFilteredPeople(people, query, centuries, sex);
  }, [people, query, centuries, sex]);

  const sortedPeople = useMemo(() => {
    return getSortedPeople(filteredPeople, sort, order);
  }, [filteredPeople, sort, order]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFilter(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && isFilter && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container has-min-height">
              {isLoading && (
                <Loader />
              )}

              {isError ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : (
                <>
                  {!isLoading && people?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!isLoading
                    && !!filteredPeople?.length
                    && !!people?.length && (
                    <PeopleTable people={sortedPeople} />
                  )}

                  {!isLoading && filteredPeople?.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
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
