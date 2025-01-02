import React from 'react';

import { Person } from '../../../types';
import { TableHead } from '../../../types/TableHead';

import { TableColumn } from './TableColumn';
import { TableRow } from './TableRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TableHead).map(([key, value]) => (
            <TableColumn key={value} column={[key, value]} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <TableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
