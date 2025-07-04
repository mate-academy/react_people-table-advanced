import { useState } from 'react';
import PeopleContent from '../PeopleContent/PeopleContent';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

const PeoplePage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loading || (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              <PeopleContent loading={loading} setLoading={setLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
