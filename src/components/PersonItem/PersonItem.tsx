import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { NO_PARENT } from '../../utils/constants';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
  chosenUserSlug: string,
};

export const PersonItem: React.FC<Props> = ({ person, chosenUserSlug }) => {
  const {
    slug,
    sex,
    born,
    died,
    father,
    mother,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === chosenUserSlug,
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
          : motherName || NO_PARENT}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || NO_PARENT}
      </td>
    </tr>
  );
};
