import React from 'react';
import {
  useParams,
  Link,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    born,
    died,
    fatherName,
    father,
    motherName,
    mother,
    sex,
    slug,
  } = person;

  const { personSlug } = useParams();

  const isWomen = sex === 'f';
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames(
        { 'has-background-warning': personSlug === slug },
      )}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames(
            { 'has-text-danger': isWomen },
          )}
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
            className="has-text-danger"
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
