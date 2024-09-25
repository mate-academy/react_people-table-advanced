import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
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

  const { slug: slugUrl } = useParams();
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slugUrl === slug })}
    >
      <td>
        <Link
          to={{
            pathname: `../${slug}`,
            search: search.toString(),
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
              pathname: `../${mother.slug}`,
              search: search.toString(),
            }}
            className="has-text-danger"
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
              pathname: `../${father.slug}`,
              search: search.toString(),
            }}
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
