import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SexValues } from '../types/types';

export const PersonItem = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();
  const { slugParam } = useParams();

  const {
    name,
    slug,
    sex,
    born,
    died,
    mother,
    father,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugParam === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': sex === SexValues.female,
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
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
          >
            {mother.name}
          </Link>
        ) : motherName ? (
          motherName
        ) : (
          '-'
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {father.name}
          </Link>
        ) : fatherName ? (
          fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
