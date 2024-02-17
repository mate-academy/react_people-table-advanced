import cn from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  personSlug?: string;
  persons: Person[];
};

export const PersonLink: React.FC<Props> = ({
  persons,
  person,
  personSlug,
}) => {
  const {
    sex,
    name,
    motherName,
    fatherName,
    slug,
    born,
    died,
  } = person;

  const { search } = useLocation();

  const isFemale = person.sex === 'f' ? 'has-text-danger' : '';

  const selectPerson = slug === personSlug
  || motherName === personSlug
  || fatherName === personSlug ? 'has-background-warning' : '';

  const father = persons.find(
    dad => dad.name === fatherName,
  )?.slug;

  const mother = persons.find(
    mom => mom.name === motherName,
  )?.slug;

  return (
    <tr
      data-cy="person"
      className={cn(selectPerson)}
    >
      <td>
        <NavLink
          to={{ pathname: `/people/${slug}`, search }}
          className={isFemale}
          key={personSlug}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          <NavLink
            to={{ pathname: `/people/${mother}`, search }}
            className={isFemale}
            key={personSlug}
          >
            {motherName}
          </NavLink>
        ) : '-'}
      </td>
      <td>
        {fatherName ? (
          <NavLink
            to={{ pathname: `/people/${father}`, search }}
            className={isFemale}
            key={personSlug}
          >
            {fatherName}
          </NavLink>
        ) : '-'}
      </td>
    </tr>
  );
};
