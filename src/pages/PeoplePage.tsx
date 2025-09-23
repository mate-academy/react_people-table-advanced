import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useParams } from 'react-router-dom';
import { usePeople } from '../PeopleProvider';

export const PeoplePage = () => {
  const { slug } = useParams();
  const {
    people,
    filteredAndSortedPeople,
    isLoading,
    errorMessage,
    sex,
    query,
    centuries,
    allCenturies,
    handleGenderChange,
    handleQueryChange,
    handleCenturyChange,
    clearCenturies,
    resetAll,
    handleSort,
  } = usePeople();

  const hasFilteredPeople = filteredAndSortedPeople.length > 0;
  const noPeopleOnServer = !isLoading && !errorMessage && people.length === 0;
  const noPeopleMatchFilter = !isLoading && !errorMessage && people.length > 0 && !hasFilteredPeople;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !errorMessage && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
                allCenturies={allCenturies}
                handleGenderChange={handleGenderChange}
                handleQueryChange={handleQueryChange}
                handleCenturyChange={handleCenturyChange}
                clearCenturies={clearCenturies}
                resetAll={resetAll}
              />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {noPeopleMatchFilter && (
                <p>There are no people matching the current search criteria</p>
              )}
              {hasFilteredPeople && (
                <PeopleTable
                  people={filteredAndSortedPeople}
                  slug={{ slug }}
                  handleSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};