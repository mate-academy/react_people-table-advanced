import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { ParentLink } from './ParentLink';

type Props = {
  person: Person;
  personSlug?: string;
};

export const PeopleLink: React.FC<Props> = ({ person, personSlug }) => {
  const {
    name,
    died,
    born,
    sex,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{(mother ? <ParentLink parent={mother} /> : motherName) || '-'}</td>
      <td>{(father ? <ParentLink parent={father} /> : fatherName) || '-'}</td>
    </tr>
  );
};
