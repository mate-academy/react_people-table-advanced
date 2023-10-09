import React from 'react';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { NOT_SET_VALUE } from '../../utils/variables';

type Props = {
  person: Person;
  selectedPersonSlug: string;
};

export const PersonItem: React.FC<Props> = ({
  person,
  selectedPersonSlug,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const isSelected = selectedPersonSlug === slug;

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
          ? (<PersonLink person={mother} />)
          : motherName || NOT_SET_VALUE}
      </td>

      <td>
        {father
          ? (<PersonLink person={father} />)
          : fatherName || NOT_SET_VALUE}
      </td>
    </tr>
  );
};
