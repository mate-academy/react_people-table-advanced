import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Table } from './Table';
import usePeople from '../hooks/usePeople';

export const PeoplePage = () => {
  const { people, isLoading, isError } = usePeople();

  const ErrorMsg = () => (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );

  const NoPeopleMsg = () => (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && isError && <ErrorMsg />}
              {!isLoading && people.length === 0 && <NoPeopleMsg />}
              {!isLoading && !isError && people.length && (
                <Table people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
