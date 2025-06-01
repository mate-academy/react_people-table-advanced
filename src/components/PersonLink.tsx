import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  findPersonBySlug: (name: string | null) => undefined | Person | null;
};

export const PersonLink: React.FC<Props> = ({ person, findPersonBySlug }) => {
  const { slug } = useParams();

  const mother = findPersonBySlug(person.motherName);
  const father = findPersonBySlug(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          mother ? (
            <Link
              className={mother.sex === 'f' ? 'has-text-danger' : ''}
              to={`/people/${mother.slug}`}
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          father ? (
            <Link
              className={father.sex === 'f' ? 'has-text-danger' : ''}
              to={`/people/${father.slug}`}
            >
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
