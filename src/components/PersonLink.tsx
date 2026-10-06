import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
type Props = {
  person: Person;
  people: Person[];
};
export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  function findParent(parentName: string | null) {
    return people.find(({ name }) => name === parentName);
  }

  const mother = findParent(person.motherName);
  const father = findParent(person.fatherName);
  const isActive = person.slug === slug;

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': isActive })}>
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
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
