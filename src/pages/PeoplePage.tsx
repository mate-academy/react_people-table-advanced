import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import {
  ErrorMessages, Person, SexFilter, SortType, SortDirection,
} from '../types';
import * as peopleService from '../api';
import { Loader } from '../components/Loader';
import { Layout } from '../components/Layout';
import { PeopleFilters } from '../components/PeopleFilters';
import { getVisiblePeople } from '../utils/getVisiblePeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') as SexFilter;
  const sort = searchParams.get('sort') as SortType;
  const order = searchParams.get('order') as SortDirection;

  const fetchPeople = () => {
    setLoading(true);
    setError(false);

    peopleService
      .getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchPeople, []);

  const visiblePeople = useMemo(() => getVisiblePeople(
    people,
    {
      query, centuries, sex, sort, order,
    },
  ), [people, searchParams]);

  return (
    <Layout title="People Page">
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                sex={sex}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {ErrorMessages.SERVER_ERROR}
                </p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  {ErrorMessages.NO_PEOPLE_ON_SERVER}
                </p>
              )}

              {visiblePeople.length === 0 && !loading && !error && (
                <p>
                  {ErrorMessages.NO_MATCHING_PEOPLE}
                </p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sortType={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
