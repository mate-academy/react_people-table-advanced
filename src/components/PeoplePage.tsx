import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeoplePageProps } from './types';

export const PeoplePage: React.FC<PeoplePageProps> = ({
  people,
  error,
  loadingPeople,
  visiblePeople,
}) => {
  const errorNoPeople = !loadingPeople && people.length === 0;
  const errorNoCommonPeople = people.length > 0 && visiblePeople.length === 0;
  const launchTableCheck =
    !error && people.length > 0 && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loadingPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loadingPeople ? (
                <Loader />
              ) : (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {errorNoPeople && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {errorNoCommonPeople && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {launchTableCheck && <PeopleTable people={visiblePeople} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
