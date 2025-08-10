import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRecord: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const peopleMap = new Map(people.map(p => [p.name, p]));

  const mother = !person.motherName
    ? undefined
    : peopleMap.get(person.motherName);
  const father = person.fatherName
    ? peopleMap.get(person.fatherName)
    : undefined;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
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
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
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
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
