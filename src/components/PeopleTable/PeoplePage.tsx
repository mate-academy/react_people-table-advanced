import { Loader } from '../Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { useSearchPeople } from '../../hooks/useSearchPeople';

export const PeoplePage = () => {
  const {
    query,
    selectedCenturies,
    sex,
    handleQuerySearch,
    handleSelectCentury,
    handleSelectSort,
    isLoading,
    error,
    sortedPeople,
    currentOrder,
    currentSort,
  } = useSearchPeople();

  return (
    <>
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      <h1 className="title">People Page</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                sex={sex}
                handleQuerySearch={handleQuerySearch}
                handleSelectCentury={handleSelectCentury}
                selectedCenturies={selectedCenturies}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                {sortedPeople.length === 0 && !isLoading ? (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable
                    sortedPeople={sortedPeople}
                    handleSelectSort={handleSelectSort}
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

{
  // <p data-cy="noPeopleMessage">There are no people on the server</p>
}
