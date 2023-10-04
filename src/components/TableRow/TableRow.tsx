import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { NO_DATA } from '../../utils/constants';

type Props = {
  person: Person;
  selectedPersonSlug: string;
};

export const TableRow: React.FC<Props> = ({ person, selectedPersonSlug }) => {
  const {
    sex,
    born,
    died,
    slug,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPersonSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || NO_DATA
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || NO_DATA
        )}
      </td>
    </tr>
  );
};
