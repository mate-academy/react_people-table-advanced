import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonSlug } from '../PersonSlug/PersonSlug';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const {
    sex,
    born,
    died,
    father,
    fatherName,
    mother,
    motherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <PersonSlug person={person} aria-label={slug} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonSlug person={mother} /> : (motherName || '-')}</td>
      <td>{father ? <PersonSlug person={father} /> : (fatherName || '-')}</td>
    </tr>
  );
};
