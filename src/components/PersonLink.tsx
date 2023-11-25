import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';
import { NO_PARENT } from '../utils/constants';
import { SexFilter } from '../types/SearchParams';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const { personId } = useParams();
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={personId === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={{ pathname: `/people/${slug}`, search }}
          className={sex === SexFilter.Female ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={{ pathname: `/people/${mother.slug}`, search }}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          <p>
            {motherName ? `${motherName}` : NO_PARENT}
          </p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={{ pathname: `/people/${father.slug}`, search }}>
            {father.name}
          </Link>
        ) : (
          <p>
            {fatherName ? `${fatherName}` : NO_PARENT}
          </p>
        )}
      </td>
    </tr>
  );
};
