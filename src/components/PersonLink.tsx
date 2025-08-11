import { Link, useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
  searchPeople: (name: string | null) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, searchPeople }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const mother = searchPeople(person.motherName);
  const father = searchPeople(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `../${person.slug}`,
            search: searchParams.toString(),
          }}
          className={cn({
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
        {mother ? (
          <Link
            className="has-text-danger"
            to={{
              pathname: `../${mother?.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: `../${father?.slug}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
