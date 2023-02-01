import { memo } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage = memo(() => {
  const { people } = usePeople();

  return (
    <>
      {people.length > 0 && (
        <div className="column is-7-tablet is-narrow-desktop">
          <PeopleFilters />
        </div>
      )}

      <div className="column">
        <div className="box table-container">
          <PeopleTable />
        </div>
      </div>
    </>
  );
});
