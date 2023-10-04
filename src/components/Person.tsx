import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonType } from '../types';
import { PersonLink } from './PersonLink';
import { EMPTY_PARENT_VALUE } from '../utils/constats';

type Props = {
  person: PersonType,
};

export const Person: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
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
          motherName || EMPTY_PARENT_VALUE
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || EMPTY_PARENT_VALUE
        )}
      </td>
    </tr>
  );
};
