import { useEffect, useMemo, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  Gender, Person, SortType, OrderType,
} from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { prepearedPeople } from '../utils/helper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') as Gender;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sortBy = searchParams.get('sort') as SortType;
  const order = searchParams.get('order') as OrderType;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    return prepearedPeople(
      people,
      {
        sex,
        query,
        centuries,
        sortBy,
        order,
      },
    );
  }, [people, sex, query, centuries, sortBy, order]);

  const hasPeople = !loading && !errorMessage && people?.length !== 0;

  return (
    <>
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                {!loading && !errorMessage && (
                  <PeopleFilters
                    sex={sex}
                    query={query}
                    centuries={centuries}
                  />
                )}
              </div>

              <div className="column">
                <div className="box table-container">
                  {loading && (
                    <Loader />
                  )}

                  {!loading && errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {!loading && !errorMessage && visiblePeople?.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {hasPeople && (
                    <PeopleTable
                      people={visiblePeople}
                      sort={sortBy}
                      order={order}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Outlet />
    </>
  );
};
