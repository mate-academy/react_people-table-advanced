import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { Gender } from '../types/Gender';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { userSlug } = useParams();
  const {
    name,
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === userSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === Gender.Female })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.mother ? (
          <Link
            to={
              { pathname: `/people/${person.mother.slug}`, search: searchParams.toString() }
            }
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (motherName || '-')}
      </td>

      <td>
        {person.father ? (
          <Link
            to={
              { pathname: `/people/${person.father.slug}`, search: searchParams.toString() }
            }
          >
            {fatherName}
          </Link>
        ) : (fatherName || '-')}
      </td>
    </tr>
  );
};
