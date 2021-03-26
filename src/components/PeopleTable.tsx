import React from 'react';
import { PersonRow } from './PersonRow';
import { TableHeader } from './TableHeader';

import { People } from './types';

const tableHeaders = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<People> = ({ people }) => (
  <div className="peopleTable">

    <table className="peopleTable__Body">
      <thead>
        <tr className="peopleTable__rowsHeader">
          {tableHeaders.map(header => (
            <TableHeader key={header} header={header} />
          ))}
          <th
            className="peopleTable__rowsHeader peopleTable__cell"
          >
            Mother
          </th>
          <th
            className="peopleTable__rowsHeader peopleTable__cell"
          >
            Father
          </th>
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
