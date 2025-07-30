import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { usePeopleContext } from '../context/PeopleContext';

export const PeoplePage = () => {
  const { peoples, isLoading, peopleLoadingError } = usePeopleContext();

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {peopleLoadingError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {peopleLoadingError}
                  </p>
                )}

                {peoples?.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <>{isLoading ? <Loader /> : <PeopleTable />}</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
