import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams?.toString(),
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
            to={{
              pathname: `/people/${person.mother?.slug}`,
              search: searchParams?.toString(),
            }}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <Link
            to={{
              pathname: `/people/${person.father?.slug}`,
              search: searchParams?.toString(),
            }}
          >
            {person.father.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
