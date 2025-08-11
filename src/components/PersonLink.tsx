import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug: personSlug,
    mother,
    father,
  } = person;
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          to={{
            pathname: personSlug,
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
            to={{
              pathname: mother.slug,
              search: searchParams.toString(),
            }}
            className={classNames({
              'has-text-danger': mother.sex === 'f',
            })}
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: father.slug,
              search: searchParams.toString(),
            }}
            className={classNames({
              'has-text-danger': father.sex === 'f',
            })}
          >
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
