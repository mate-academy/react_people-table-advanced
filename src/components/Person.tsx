import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonCard: React.FC<Props> = ({ person }) => {
  const { mother, father } = person;
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {mother ? (
        <td>
          <Link
            className="has-text-danger"
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
