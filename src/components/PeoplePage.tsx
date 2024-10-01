import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeopleContext } from '../context/PeopleContext';
import { useEffect } from 'react';

export const PeoplePage = () => {
  const { getAllPeople, loading, error, people } = usePeopleContext();

  useEffect(() => {
    getAllPeople();
  }, [getAllPeople]);

  const isDataLoaded = !loading && !error;
  const isNoPeople = isDataLoaded && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isDataLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isDataLoaded && people.length > 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
