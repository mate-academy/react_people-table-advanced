import React from 'react';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn('', {
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}?${searchParams.toString()}`}
          className={cn('', { 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.mother ? (
        <td>
          <Link
            to={`/people/${person.mother.slug}?${searchParams.toString()}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        </td>
      ) : (
        <td>{person.motherName ? person.motherName : '-'}</td>
      )}

      {person.father ? (
        <td>
          <Link to={`/people/${person.father.slug}?${searchParams.toString()}`}>
            {person.father.name}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName ? person.fatherName : '-'}</td>
      )}
    </tr>
  );
};
