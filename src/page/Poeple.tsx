import { Outlet } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { usePeopleContext } from '../components/PeopleContext/PeopleContext';

export const Poeple = () => {
  const {
    loading,
  } = usePeopleContext();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <Outlet />
          </div>
        </div>
      </div>

    </>
  );
};
