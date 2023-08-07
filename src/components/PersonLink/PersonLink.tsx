import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
    slug,
  } = person;

  const { userSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        {
          'has-background-warning': userSlug === slug,
        },
      )}
    >
      <td>
        {userSlug === slug ? (
          <Link
            to=".."
            className={classNames(
              {
                'has-text-danger': sex === 'f',
              },
            )}
          >
            {name}
          </Link>
        ) : (
          <Link
            to={`../${slug}`}
            className={classNames(
              {
                'has-text-danger': sex === 'f',
              },
            )}
          >
            {name}
          </Link>
        )}
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {mother ? (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
