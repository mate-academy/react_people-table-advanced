import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { filterTable } from '../utils/filterTable';
// import { sortTable } from '../utils/sortTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort' || '');
  const order = searchParams.get('order' || '');

  useEffect(() => {
    setLoaded(true);

    getPeople()
      .then((people) => setPeoples(people))
      .catch(() => setError(true))
      .finally(() => setLoaded(false));
  }, []);

  const filterPeople = useMemo(() => {
    return filterTable(peoples, sex, query, centuries, sort, order);
  }, [sex, centuries, query]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                query={query}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loaded && (
                <Loader />
              )}

              {error && (
                <>
                  <p data-cy="peopleLoadingError">Something went wrong</p>

                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                </>
              )}

              {/* {!match && (
                <p>There are no people matching the current search criteria</p>
              )} */}

              {!loaded && (
                <PeopleTable
                  peoples={filterPeople}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
