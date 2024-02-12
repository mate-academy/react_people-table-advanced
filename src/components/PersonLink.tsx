import { Link, useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

import { Person } from '../types';

interface Props {
  person: Person,
  getParentSlug: (parentName: string) => string | undefined,
}

export const PersonLink: React.FC<Props> = ({
  person,
  getParentSlug,
}) => {
  const { slug } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug: currentSlug,
  } = person;

  const fatherSlug = getParentSlug(fatherName ?? '');
  const motherSlug = getParentSlug(motherName ?? '');

  return (
    <tr
      key={currentSlug}
      data-cy="person"
      className={classNames({
        'has-background-warning': currentSlug === slug,
      })}
    >
      <td>
        <Link
          to={`../${currentSlug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {motherName && motherSlug ? (
        <td>
          <Link
            className="has-text-danger"
            to={`../${motherSlug}`}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {fatherName && fatherSlug ? (
        <td>
          <Link to={`../${fatherSlug}`}>
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
