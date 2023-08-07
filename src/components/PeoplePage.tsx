import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setLoading(true);
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });
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
            {!loading && !showError && (
              <PeopleFilters />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {showError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {filteredPeople.length === 0 && !loading && (
                    <p data-cy="noPeopleMessage">
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {filteredPeople.length !== 0 && people.length !== 0 && (
                    <PeopleTable
                      people={filteredPeople}
                    />
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
