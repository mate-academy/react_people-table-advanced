import React from 'react';

import { Person } from '../../types';

import { PersonLink } from '../PersonLink/PersonLink';
import { TableHead } from '../TableHead/TableHead';
import { ErrorNames } from '../../types/ErrorNames';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const prepairedPeople = people.map((person: Person) => {
    return {
      ...person,
      mother: people.find(prepairedPerson => {
        return prepairedPerson.name === person.motherName;
      }),
      father: people.find(prepairedPerson => {
        return prepairedPerson.name === person.fatherName;
      }),
    };
  });

  if (prepairedPeople.length === 0) {
    return (
      <p>
        {ErrorNames.NoFilteredPeople}
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map((th) => (
            <TableHead th={th} key={th} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {prepairedPeople.map((person: Person) => (
          <PersonLink
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
