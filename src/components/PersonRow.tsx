import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
  people: Person[]
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();

  const isPersonInTable = (personName: string | null) => {
    if (personName) {
      return people.find(p => p.name === personName);
    }

    return false;
  };

  const getSlugByName = (name: string | null) => {
    return people.find(p => p.name === name)?.slug;
  };

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn(
        { 'has-background-warning': person.slug === personSlug },
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {isPersonInTable(person.motherName)
          ? (
            <Link
              to={`/people/${getSlugByName(person.motherName)}`}
              className={cn('has-text-danger')}
            >
              {person.motherName}
            </Link>

          )
          : (person.motherName || '-')}
      </td>
      <td>
        {isPersonInTable(person.fatherName)
          ? (
            <Link
              to={`/people/${getSlugByName(person.fatherName)}`}
            >
              {person.fatherName}
            </Link>
          )
          : (person.fatherName || '-')}
      </td>
    </tr>
  );
};
