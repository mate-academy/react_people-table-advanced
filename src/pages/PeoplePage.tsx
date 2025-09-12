import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useFetchPeople } from '../hooks/useFetchPeople';
import { useFilterPeople } from '../hooks/useFilterPeople';
import { useSearchParams } from 'react-router-dom';

const PeoplePage = () => {
  const { people, isLoading, error } = useFetchPeople();
  const [searchParams, setSearchParams] = useSearchParams();

  const { filteredPeople, filterError } = useFilterPeople(people);

  const isServerError =
    !isLoading && !error && people !== null && people?.length === 0;

  // const renderTable =
  //   !isLoading && !error && filteredPeople && filteredPeople?.length > 0;
  const filtersVisible = !isLoading && !error && people !== null;
  const tableVisible = filteredPeople && filteredPeople.length > 0;

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {filtersVisible && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isServerError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {filterError && <p>{filterError}</p>}

              {tableVisible && (
                <PeopleTable
                  people={filteredPeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
