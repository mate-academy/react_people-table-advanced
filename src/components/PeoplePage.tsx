import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from '../store/PeopleContext';

export const PeoplePage = () => {
  const { isLoading, errorMsg, filteredPeople } = usePeople();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoading && errorMsg && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMsg}
                </p>
              )}
              {!isLoading && !errorMsg && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">{errorMsg}</p>
              )}
              {filteredPeople.length > 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
