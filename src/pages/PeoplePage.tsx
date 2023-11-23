import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilter';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const isTableShown = !loading && !hasError && !!people.length;
  const isNoPeopleOnServer = !loading && !hasError && !people.length;

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

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
              {loading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isTableShown && (
                <PeopleTable
                  people={people}
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
