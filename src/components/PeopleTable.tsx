import React from 'react';

import { Person } from '../types/Person';
import { SortFilters } from '../types/Filter';

import { TableColumn } from './TableColumn';
import { PersonRow } from './PersonRow';

const tableColums = [
  { key: SortFilters.Name, value: 'Name' },
  { key: SortFilters.Sex, value: 'Sex' },
  { key: SortFilters.Born, value: 'Born' },
  { key: SortFilters.Died, value: 'Died' },
];

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
          {tableColums.map(({ key, value }) => (
            <TableColumn key={key} columnName={value} columnValue={key} />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow person={person} key={person.slug} people={people} />
        ))}
      </tbody>
    </table>
  );
};
