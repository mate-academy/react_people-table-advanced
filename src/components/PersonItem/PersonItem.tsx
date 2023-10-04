import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { NO_PARENT_MARK } from '../../utils';

type Props = {
  person: Person;
  selectedSlug: string;
};

export const PersonItem: React.FC<Props> = ({ person, selectedSlug }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    father,
    mother,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || NO_PARENT_MARK}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || NO_PARENT_MARK}
      </td>
    </tr>
  );
};
