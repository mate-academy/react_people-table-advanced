import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
  selectedSlug: string | undefined,
};

const IS_NAME = '-';

export const BodyTable: React.FC<Props> = ({ person, selectedSlug }) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      className={classNames({
        'has-background-warning': slug === selectedSlug,
      })}
      data-cy="person"
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td
        className={classNames({
          'has-text-danger': mother,
        })}
      >
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName ?? IS_NAME
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName ?? IS_NAME
        )}
      </td>
    </tr>
  );
};
