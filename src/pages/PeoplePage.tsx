import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { usePeoplePage } from './usePeoplePage';

export const PeoplePage:React.FC = () => {
  const {
    isLoading,
    people,
    hasError,
    centuriesList,
    isFiltered,
    peopleList,
  } = usePeoplePage();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters centuries={centuriesList} />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError
              && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {!isLoading && people.length === 0
              && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!hasError && !isLoading && isFiltered && peopleList.length === 0
              && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !hasError && peopleList.length > 0
              && <PeopleTable list={peopleList} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
