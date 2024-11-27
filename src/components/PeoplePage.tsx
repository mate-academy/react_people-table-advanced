import { useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {
                <PeopleTable
                  people={people}
                  setPeople={setPeople}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
