import React, { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  isSelected: boolean;
}

export const PersonInfo: FC<Props> = ({ person, isSelected }) => {
  const {
    motherName,
    fatherName,
    father,
    mother,
    sex,
    born,
    died,
  } = person;

  return (
    <tr
      data-cy="person"
      className={isSelected ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother && (
        <td>
          <PersonLink person={mother} />
        </td>
      )}

      {(!mother && motherName) && (
        <td>
          {motherName}
        </td>
      )}

      {!motherName && <td>-</td>}

      {father && (
        <td>
          <PersonLink person={father} />
        </td>
      )}

      {(!father && fatherName) && (
        <td>
          {fatherName}
        </td>
      )}

      {!fatherName && <td>-</td>}
    </tr>
  );
};
