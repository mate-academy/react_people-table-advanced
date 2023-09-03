import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    born,
    died,
    fatherName,
    father,
    motherName,
    mother,
    sex,
    slug,
  } = person;

  const { personSlug } = useParams();

  const isSelectedPerson = personSlug === slug;

  const isWomen = sex === 'f';

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames(
        { 'has-background-warning': isSelectedPerson },
      )}
    >
      <td>
        <NavLink
          to={`people/${slug}`}
          className={classNames(
            { 'has-text-danger': isWomen },
          )}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <NavLink
            to={`people/${mother.slug}`}
          >
            {motherName}
          </NavLink>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <NavLink
            to={`people/${father.slug}`}
          >
            {fatherName}
          </NavLink>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>

  );
};
