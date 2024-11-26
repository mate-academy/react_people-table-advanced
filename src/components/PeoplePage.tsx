import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';
import { LoaderContext } from '../contexts/LoaderContext';
import { PeopleContext } from '../contexts/PeopleContext';
import { PeopleFilteredContext } from '../contexts/PeopleFilteredContext';

export const PeoplePage = () => {
  const { peoplesFiltered } = useContext(PeopleFilteredContext);
  const { peoples } = useContext(PeopleContext);
  const { errorMessage } = useContext(ErrorContext);
  const { loader } = useContext(LoaderContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}
              {!loader && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!loader && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!loader && peoplesFiltered.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!loader && peoplesFiltered.length > 0 && (
                <PeopleTable peoples={peoplesFiltered} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
