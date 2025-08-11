import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../store/PeopleStore';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable/PeopleTable ';

export const PeoplePage = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    return <p>Error: PeopleContext is not available</p>;
  }

  const { people, isPeopleLoading, errorMessage } = context;

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
          <div className="column">
            <div className="box table-container">
              {isPeopleLoading ? (
                <Loader />
              ) : errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
