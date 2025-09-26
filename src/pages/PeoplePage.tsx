import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                searchParams={searchParams}
                onSearchParams={value => setSearchParams(value)}
                centuries={centuries}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : loading ? (
                <Loader />
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable
                  people={people}
                  searchParams={searchParams}
                  centuries={centuries}
                />
              )}
            </div>
          </div>
          {/* <p>There are no people matching the current search criteria</p> */}
        </div>
      </div>
    </>
  );
};
