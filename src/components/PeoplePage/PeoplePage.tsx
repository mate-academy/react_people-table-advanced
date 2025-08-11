import { PeopleFilters } from '../PeopleFilters';
import React, { useContext } from 'react';
import { PeopleTable } from '../PeopleTable';
import { StateContext } from '../../Store';

export const PeoplePage: React.FC = () => {
  const { isLoading } = useContext(StateContext);

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
              <PeopleTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
