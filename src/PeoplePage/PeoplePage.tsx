import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from './PeopleTable';
import { usePeoplePage } from './usePeoplePage';

export const PeoplePage = () => {
  const {
    people,
    isError,
    isLoading,
    peopleWithParams,
    filterBySex,
    filterByQuery,
    filterByCenturies,
    sortParam,
    sortOrderParam,
    getSortParam,
    inputOnChange,
    toggleCenturies,
  } = usePeoplePage();

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <p data-cy="peopleLoadingError">Something went wrong</p>;
    }

    if (!people.length) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (!peopleWithParams.length) {
      return <p>There are no people matching the current search criteria</p>;
    }

    return (
      <PeopleTable
        peopleWithParams={peopleWithParams}
        sortParam={sortParam}
        sortOrderParam={sortOrderParam}
        getSortParam={getSortParam}
      />
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              hidden={isLoading}
              toggleCenturies={toggleCenturies}
              inputOnChange={inputOnChange}
              filterBySex={filterBySex}
              filterByQuery={filterByQuery}
              filterByCenturies={filterByCenturies}
            />
          </div>

          <div className="column">
            <div className="box table-container">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
