import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getFilteredPeople } from '../utils/GetFilteredPeople';
import { getPeopleWithParents } from '../utils/GetPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('century');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = getFilteredPeople(
    people,
    {
      centuries: centuries,
      sex: sex,
      query: query,
    },
    { sort, order },
  );

  useEffect(() => {
    setLoading(true);
    setLoadingError(false);

    getPeople()
      .then(humans => {
        setPeople(getPeopleWithParents(humans));
      })
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && people.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {loadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !loadingError && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeople.length && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
