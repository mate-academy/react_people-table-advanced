import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

export const PersonLink = ({ person }: { person: Person }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === personSlug,
      })}
    >
      <td>
        <Link
          className={classNames({
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

      <td>
        {person.mother ? (
          <Link
            className={classNames({
              'has-text-danger': person.mother.sex === 'f',
            })}
            to={{
              pathname: `/people/${person.mother.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>

      <td>
        {person.father ? (
          <Link
            to={{
              pathname: `/people/${person.father.slug}`,
              search: searchParams.toString(),
            }}
            className={classNames({
              'has-text-danger': person.father.sex === 'f',
            })}
          >
            {person.fatherName}
          </Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
