/* eslint-disable linebreak-style */
import React from 'react';
import classnames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  findParent: (person: string) => Person | undefined;
  selectedPerson: string;
}

export const PersonItem: React.FC<Props> = ({
  person,
  findParent,
  selectedPerson,
}) => {
  const father = person.fatherName ? findParent(person.fatherName) : null;
  const mother = person.motherName ? findParent(person.motherName) : null;

  return (
    <tr
      data-cy="person"
      className={classnames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>

        {father ? (
          <PersonLink person={father} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
