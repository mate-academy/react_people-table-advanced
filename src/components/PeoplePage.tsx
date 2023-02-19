import { FC, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

type Prop = {
  people: Person[] | undefined;
  selectedName: string;
};
export const PeoplePage: FC<Prop> = ({ selectedName, people }) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters query={query} setQuery={setQuery} />
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable
                people={people}
                selectedName={selectedName}
                query={query}
              />
              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
