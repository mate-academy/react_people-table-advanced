import { Link, useParams } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const isActivePerson = slug === person.slug;

  const isPersonInTable = (name: string | null) => {
    return people.some(p => p.name === name);
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isActivePerson,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
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
        {person.mother && isPersonInTable(person.motherName) ? (
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father && isPersonInTable(person.fatherName) ? (
          <Link to={`/people/${person.father.slug}`}>{person.fatherName}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
