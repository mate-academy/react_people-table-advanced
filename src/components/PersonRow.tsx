import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
  isSelected: boolean;
  people: Person[];
}

export const PersonRow: React.FC<Props> = ({ person, isSelected, people }) => {
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
