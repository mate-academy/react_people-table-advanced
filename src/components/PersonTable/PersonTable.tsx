import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonTable: React.FC<Props> = ({ person }) => {
  const { slug: routeSlug } = useParams();
  const { search } = useLocation();

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
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': routeSlug === slug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={{ pathname: `../${slug}`, search }}
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
            to={{ pathname: `../${mother.slug}`, search }}
          >
            {motherName}
          </Link>
        ) : (
          `${motherName || '-'}`
        )}
      </td>

      <td>
        {father ? (
          <Link to={{ pathname: `../${father.slug}`, search }}>
            {fatherName}
          </Link>
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
