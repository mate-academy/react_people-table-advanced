import React from 'react';
import { Person } from '../types/Person';
import { PersonRow } from './PersonRow';
import { TableTitle } from './TableTitle';

type Props = {
  people: Person[]
};

const tableTitles = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {tableTitles.map(title => (
          <TableTitle title={title} key={title} />
        ))}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PersonRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);
