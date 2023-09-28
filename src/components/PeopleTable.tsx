import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person,
};

export const PeopleTable: React.FC<Props> = ({ person }) => {
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

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          // to={`../${slug}`}
          to={personSlug ? `../${slug}` : slug}
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
            className="has-text-danger"
            to={`../${mother.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
