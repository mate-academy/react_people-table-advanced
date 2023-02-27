import React from 'react';
import classNames from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from '../../PersonLink';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonRow: React.FC<Props> = React.memo(({
  person, isSelected,
}) => {
  const {
    sex, born, died, motherName, fatherName, mother, father,
  } = person;

  const formattedMotherName = !motherName ? '-' : motherName;
  const formattedFatherName = !fatherName ? '-' : fatherName;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {!mother
          ? formattedMotherName
          : <PersonLink person={mother} />}
      </td>
      <td>
        {!father
          ? formattedFatherName
          : <PersonLink person={father} />}
      </td>
    </tr>
  );
});
