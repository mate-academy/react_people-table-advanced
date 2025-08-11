import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const param = useParams();
  const [searchParams] = useSearchParams();
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <>
      <tr
        data-cy="person"
        className={classNames({
          'has-background-warning': slug === param.slug,
        })}
      >
        <td>
          <Link
            to={{
              pathname: `/people/${slug}`,
              search: searchParams.toString(),
            }}
            className={classNames({ 'has-text-danger': sex === 'f' })}
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
                pathname: `/people/${mother.slug}`,
                search: searchParams.toString(),
              }}
              className="has-text-danger"
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
          ) : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
