import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeopleContext } from '../context/PeopleContext';
import { useEffect } from 'react';

export const PeoplePage = () => {
  const { getAllPeople, loading, error, people } = usePeopleContext();

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
