import React from 'react';

import { PersonTableRow } from './PersonTableRow';
import { TableHeadWithSort } from './PeopleTableSort';

import { Person } from '../types';

type Props = {
  peopleList: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <TableHeadWithSort />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonTableRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
