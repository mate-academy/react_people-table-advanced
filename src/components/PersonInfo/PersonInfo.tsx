import React from 'react';
import classnames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  selectedPersonSlug: string;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  selectedPersonSlug,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const isSelected = selectedPersonSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classnames({ 'has-background-warning': isSelected })}
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
          ) : (
            motherName || '-'
          )}
      </td>
      <td>
        {father
          ? (
            <PersonLink person={father} />
          ) : (
            fatherName || '-'
          )}
      </td>
    </tr>
  );
};
