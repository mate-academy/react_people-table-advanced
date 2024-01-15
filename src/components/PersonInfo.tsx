import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

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
        <PersonLink person={person} aria-label={slug} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : (motherName || '-')}</td>
      <td>{father ? <PersonLink person={father} /> : (fatherName || '-')}</td>
    </tr>
  );
};
