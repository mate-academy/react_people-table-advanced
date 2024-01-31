import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

type Props = {
  isError: boolean;
  people: Person[];
  loading: boolean;
};

export const PeoplePage: React.FC<Props> = ({ isError, people, loading }) => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}
              {!people.length && !loading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loading && !isError && people.length < 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              <PeopleTable people={people} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
