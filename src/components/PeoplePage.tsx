import { useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable setIsLoaded={setIsLoaded} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
