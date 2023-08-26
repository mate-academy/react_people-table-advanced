import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { TableHead } from '../TableHead/TableHead';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {people.length > 0 && <TableHead />}
      <tbody>
        {people.map(person => (
          <PersonLink person={person} />
        ))}
      </tbody>
    </table>
  );
};
