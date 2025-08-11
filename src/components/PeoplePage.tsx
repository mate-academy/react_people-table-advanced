import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from '../providers/PeopleProvider';

export const PeoplePage = () => {
  const { people, peopleCount, pending, error } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!pending && !!peopleCount && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {pending && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!pending && !peopleCount && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!pending && !!peopleCount && !people.length && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!pending && !!people.length && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
