import { useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTableContainer } from './PeopleTableContainer';

export const PeopleBlock = () => {
  const [isPeopleDownload, setIsPeopleDownload] = useState(false);

  return (
    <div className="columns is-desktop is-flex-direction-row-reverse">
      <div className="column is-7-tablet is-narrow-desktop">
        {isPeopleDownload && <PeopleFilters />}
      </div>

      <div className="column">
        <div className="box table-container">
          <PeopleTableContainer onSetIsPeopleDownload={setIsPeopleDownload} />
        </div>
      </div>
    </div>
  );
};
