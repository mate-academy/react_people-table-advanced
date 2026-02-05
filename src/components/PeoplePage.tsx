/* eslint-disable curly */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleProvider, usePeople } from '../context/PeopleContext';

const PeoplePageContent = () => {
  const { people, loading, error } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PeoplePage = () => (
  <PeopleProvider>
    <PeoplePageContent />
  </PeopleProvider>
);
