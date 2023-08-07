import React, { useEffect } from 'react';
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
  let mother: Person | undefined;
  let father: Person | undefined;

  useEffect(() => {
    mother = findPerson(motherName);
    father = findPerson(fatherName);
  }, []);

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
      <td>
        {mother
          ? (
            <Link
              to={`/people/${mother.slug}?${searchParams.toString()}`}
              className={cn({
                'has-text-danger': mother.sex === 'f',
              })}
            >
              {mother.name}
            </Link>
          ) : (motherName || '-')}
      </td>
      <td>
        {father ? (
          <Link
            to={`/people/${father.slug}?${searchParams.toString()}`}
          >
            {father.name}
          </Link>
        ) : (
          (fatherName || '-')
        )}
      </td>
    </tr>
  );
};
