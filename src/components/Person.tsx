import React from 'react';
import { Person as PersonType } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

interface PersonProps {
  person: PersonType;
  active: boolean;
}

export const Person: React.FC<PersonProps> = ({ person, active }) => {
  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': active,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
