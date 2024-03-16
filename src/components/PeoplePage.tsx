import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { getVisiblePeople } from '../utils/sortHelper';
import { SearchParamsValue } from '../types/SearchParamsValue';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const query = searchParams.get(SearchParamsValue.QUERY) || '';
  const centuries = useMemo(
    () => searchParams.getAll(SearchParamsValue.CENTURIES) || [],
    [searchParams],
  );
  const sex = searchParams.get(SearchParamsValue.SEX) || '';
  const sort = searchParams.get(SearchParamsValue.SORT) || '';
  const order = searchParams.get(SearchParamsValue.ORDER) || '';

  useEffect(() => {
    setError(false);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () => getVisiblePeople(people, query, sex, sort, centuries, order),
    [people, query, sex, sort, centuries, order],
  );
  const isVisiblePeople = !!visiblePeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && isVisiblePeople && (
                <PeopleTable people={visiblePeople} />
              )}

              {!loading && !isVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
