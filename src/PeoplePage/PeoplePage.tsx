import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from './PeopleTable';
import { usePeoplePage } from './usePeoplePage';

export const PeoplePage = () => {
  const {
    people,
    isError,
    isLoading,
    filteredPeople,
    selectedSex,
    searchQuery,
    selectedCenturies,
    sortParam,
    sortOrderParam,
    getSortParam,
    onSearchChange,
    toggleCenturySelection,
  } = usePeoplePage();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              hidden={isLoading}
              toggleCenturySelection={toggleCenturySelection}
              onSearchChange={onSearchChange}
              selectedSex={selectedSex}
              searchQuery={searchQuery}
              selectedCenturies={selectedCenturies}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : !people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : !filteredPeople.length ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  sortParam={sortParam}
                  sortOrderParam={sortOrderParam}
                  getSortParam={getSortParam}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
