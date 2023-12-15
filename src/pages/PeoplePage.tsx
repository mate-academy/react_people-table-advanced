import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters/PeopleFilters';
import { PeopleContext } from '../components/PeopleProvider/PeopleProvider';

export const PeoplePage: React.FC = () => {
  const { isLoading } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </>
  );
};
