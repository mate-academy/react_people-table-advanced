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

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName !== null
        && onFindPerson(person.motherName) !== undefined
        && (
          <Link
            className="has-text-danger"
            to={{
              pathname: `/people/${
                onFindPerson(person.motherName)?.slug || ''
              }`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName}
          </Link>
        )}

        {person.motherName !== null
        && onFindPerson(person.motherName) === undefined && (
          `${person.motherName}`
        )}

        {!person.motherName && '-'}
      </td>
      <td>
        {person.fatherName !== null
        && onFindPerson(person.fatherName) !== undefined
        && (
          <Link
            to={{
              pathname: `/people/${
                onFindPerson(person.fatherName)?.slug || ''
              }`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        )}

        {person.fatherName !== null
        && onFindPerson(person.fatherName) === undefined && (
          `${person.fatherName}`
        )}

        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
