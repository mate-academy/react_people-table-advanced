import cn from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import { ParentLink } from './ParentLink';
import { Sex } from '../types/Sex';
import { selectPersonWith } from '../utils/selectPersonWith';

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

  const location = useLocation().search;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === Sex.Female })}
          to={selectPersonWith(`/people/${slug}`, location)}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(mother ? (
          <ParentLink parent={mother} location={location} />
        ) : (
          motherName
        )) || '-'}
      </td>
      <td>
        {(father ? (
          <ParentLink parent={father} location={location} />
        ) : (
          fatherName
        )) || '-'}
      </td>
    </tr>
  );
};
