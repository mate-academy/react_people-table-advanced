import { Link, useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

import { Person } from '../types';

interface Props {
  person: Person,
  names: string[],
  getParentSlug: (parentName: string) => string | undefined,
}

export const PersonLink: React.FC<Props> = ({
  person,
  names,
  getParentSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug: currentSlug,
  } = person;
  const { slug } = useParams();

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

      {motherName && names.includes(motherName) ? (
        <td>
          <Link
            className="has-text-danger"
            to={`../${getParentSlug(motherName)}`}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {fatherName && names.includes(fatherName) ? (
        <td>
          <Link to={`../${getParentSlug(fatherName)}`}>
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
