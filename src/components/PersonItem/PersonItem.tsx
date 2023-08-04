import React from 'react';
import cn from 'classnames';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person,
  findPerson: (name: string | null) => Person | undefined,
}

export const PersonItem: React.FC<Props> = ({
  person,
  findPerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const mother = findPerson(motherName);

  const father = findPerson(fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}?${searchParams.toString()}`}
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
      {mother ? (
        <td>
          <Link
            to={`/people/${mother.slug}?${searchParams.toString()}`}
            className={cn({
              'has-text-danger': mother.sex === 'f',
            })}
          >
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      {father ? (
        <td>
          <Link
            to={`/people/${father.slug}?${searchParams.toString()}`}
          >
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
