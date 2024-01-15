import React from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td aria-label="none">
        <Link
          to={`../${person.slug}`}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link to={`../${mother.slug}`} className="has-text-danger">
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
