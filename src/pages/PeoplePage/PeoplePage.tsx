import React, { useState } from 'react';

import { People } from '../../components/People';
import { PeopleFilters } from '../../components/PeopleFilter/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isActive && <PeopleFilters />}
          </div>

          <div className="column">
            <People setIsActive={setIsActive} />
          </div>
        </div>
      </div>
    </>
  );
};
