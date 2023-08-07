import classNames from 'classnames';
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  onFindPerson: (name: string) => Person | undefined,
};
export const PeopleLink: React.FC<Props> = ({ person, onFindPerson }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
  } = person;

  const mother = motherName ? onFindPerson(motherName) : null;
  const father = fatherName ? onFindPerson(fatherName) : null;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
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
      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={{
              pathname: `/people/${
                mother.slug || ''
              }`,
              search: searchParams.toString(),
            }}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: `/people/${
                father.slug || ''
              }`,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
