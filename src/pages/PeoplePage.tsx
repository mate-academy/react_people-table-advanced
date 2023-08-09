import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople } from '../utils/filterPeople';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    return filterPeople(people, {
      query,
      centuries,
      sex,
      sort,
      order,
    });
  }, [people, query, centuries, sex, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && (
              <PeopleFilters />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {filteredPeople.length === 0 && !loading && (
                    <p data-cy="noPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  )}
                  <PeopleTable people={filteredPeople} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
