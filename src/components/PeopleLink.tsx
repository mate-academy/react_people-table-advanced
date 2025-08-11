import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PeopleLink: React.FC<Props> = ({ person }) => {
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
  const { slug: personId } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personId === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
          <Link to={`/people/${mother?.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : motherName ? (
          motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father?.slug}`}>{fatherName}</Link>
        ) : fatherName ? (
          fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
