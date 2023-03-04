import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
  slugId: string;
  mother: Person | null;
  father: Person | null;
}

export const PersonItem: React.FC<Props> = ({
  person,
  slugId,
  father,
  mother,
}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const isSelected = slug === slugId;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          )
          : (
            motherName || '-'
          )}
      </td>
      <td>
        {father
          ? (
            <PersonLink person={father} />
          )
          : (
            fatherName || '-'
          )}
      </td>
    </tr>
  );
};
