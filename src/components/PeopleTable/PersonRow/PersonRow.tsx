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

  const displayedMotherName = !motherName ? '-' : motherName;
  const displayedFatherName = !fatherName ? '-' : fatherName;

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
          ? displayedMotherName
          : <PersonLink person={mother} />}
      </td>
      <td>
        {!father
          ? displayedFatherName
          : <PersonLink person={father} />}
      </td>
    </tr>
  );
});
