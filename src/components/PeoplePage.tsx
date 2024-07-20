import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeoplePageProps } from './types';

export const PeoplePage: React.FC<PeoplePageProps> = ({
  people,
  error,
  loadingPeople,
}) => {
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
              {loadingPeople ? <Loader /> : <PeopleTable people={people} />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loadingPeople && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/*return back later */}
              {/* <p>There are no people matching the current search criteria</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
