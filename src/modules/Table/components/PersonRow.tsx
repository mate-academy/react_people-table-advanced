import React from 'react';
import cn from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  isActive: boolean;
};

export const PersonRow: React.FC<Props> = ({ person, isActive }) => {
  const { sex, born, died, motherName, fatherName, father, mother } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isActive,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
