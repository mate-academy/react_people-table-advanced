import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import React, { useState } from 'react';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="block">
      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {!isLoading && <PeopleFilters />}
        </div>

        <div className="column">
          <div className="box table-container">
            <PeopleTable isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
