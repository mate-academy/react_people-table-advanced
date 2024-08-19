import { Outlet } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useState } from 'react';

export const PeoplePage = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <PeopleTable setShowFilters={setShowFilters} />
          <Outlet />
        </div>
      </div>
    </>
  );
};
