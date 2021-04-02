import React from 'react';
import { PersonRow } from './PersonRow';
import { TableHeader } from './TableHeader';

import { People } from './types';

const TABLE_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<People> = ({ people }) => (
  <div className="peopleTable">

    <table className="peopleTable__Body">
      <thead>
        <tr className="peopleTable__rowsHeader">
          {TABLE_HEADERS.map(header => (
            <TableHeader key={header} header={header} />
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} people={people} />
        ))}
      </tbody>

    </table>
  </div>
);
