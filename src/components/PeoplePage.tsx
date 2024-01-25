import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useFilters } from '../context/FilterProvider';

export const PeoplePage = () => {
  const {
    people, peopleToRender, isLoading, error,
  } = useFilters();

  const tableVisible = !isLoading && !error && peopleToRender.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && !isLoading
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {people.length === 0 && !isLoading
              && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleToRender.length === 0 && !isLoading
              && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {tableVisible && <PeopleTable people={peopleToRender} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
