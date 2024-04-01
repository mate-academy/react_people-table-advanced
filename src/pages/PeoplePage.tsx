import { Loader } from '../components/Loader';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../types/SearchParamsValue';
import { getVisiblePeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const query = searchParams.get(SearchParamsValue.Query) || '';
  const centuries = useMemo(
    () => searchParams.getAll(SearchParamsValue.Centuries) || [],
    [searchParams],
  );
  const sex = searchParams.get(SearchParamsValue.Sex) || '';
  const sort = searchParams.get(SearchParamsValue.Sort) || '';
  const order = searchParams.get(SearchParamsValue.Order) || '';

  const filteredPeople = useMemo(
    () => getVisiblePeople(peopleList, query, sex, sort, centuries, order),
    [peopleList, query, sex, sort, centuries, order],
  );

  const isNoPeople = !peopleList.length && !isLoading && !isError;
  const isVisiblePeople = !!filteredPeople.length;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && isVisiblePeople && (
                <PeopleTable peopleList={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
