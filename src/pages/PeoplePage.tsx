import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

export const PeoplePage = () => {
  const { people, loading, errorMessage } = useContext(PeopleContext);

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

              {errorMessage && !loading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !errorMessage && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !errorMessage && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
