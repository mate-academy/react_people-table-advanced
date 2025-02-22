import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader, PeopleList, PeopleHeader, PeopleFilters } from '../components';
import { Person, SearchParam } from '../types';
import { error } from '../constants';
import { getPeople } from '../api';
import { getFiltredPeople } from '../utils';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const groupedParams = {
    query: searchParams.get(SearchParam.QUERY),
    sex: searchParams.get(SearchParam.SEX),
    centuries: searchParams.getAll(SearchParam.CENTURIES),
    sort: searchParams.get(SearchParam.SORT),
    order: searchParams.get(SearchParam.ORDER),
  };

  const visiblePeople = useMemo(
    () => getFiltredPeople(people, groupedParams),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [people, searchParams],
  );

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error.DEFAULT}
                </p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">{error.NO_PEOPLE}</p>
              )}

              {!isLoading && !hasError && !!people.length && (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <PeopleHeader />

                  <PeopleList people={visiblePeople} />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
