import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeopleContext } from '../context.ts/PeopleContext';

export const PeoplePage = () => {
  const { loading, error, people } = usePeopleContext();
  const isPeople = people.length > 0;

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

              {error
                && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {loading && <Loader />}
              {!loading && !isPeople && !error
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
