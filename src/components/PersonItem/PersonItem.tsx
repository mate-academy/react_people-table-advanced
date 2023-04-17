import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  isSelected: boolean;
};

export const PersonItem: React.FC<Props> = ({
  person,
  isSelected,
}) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!motherName && '-'}

        {motherName && !mother && `${motherName}`}

        {motherName && mother && <PersonLink person={mother} />}
      </td>

      <td>
        {!fatherName && '-'}

        {fatherName && !father && `${fatherName}`}

        {fatherName && father && <PersonLink person={father} />}
      </td>
    </tr>
  );
};
