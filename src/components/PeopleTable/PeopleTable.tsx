/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const father = people.find(
            personItem => personItem.name === person.fatherName,
          );
          const mother = people.find(
            personItem => personItem.name === person.motherName,
          );

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              father={father}
              mother={mother}
            />
          );
        })}
      </tbody>
    </table>
  );
};
