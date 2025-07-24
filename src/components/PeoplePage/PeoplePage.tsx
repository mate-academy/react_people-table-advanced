import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { usePeopleContext } from '../../context/ContextProvider';

export const PeoplePage = () => {
  const { isLoadingPeople, fetchPeopleError } = usePeopleContext();

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoadingPeople ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
            <div className="box table-container">
              <div className="column">
                {fetchPeopleError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}
                {!isLoadingPeople && !fetchPeopleError && <Outlet />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
