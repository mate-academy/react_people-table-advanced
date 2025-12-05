import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

interface PersonLinkProps {
  personName: string | undefined;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  personName,
  people,
}) => {
  const person = people.find(p => p.name === personName);

  return (
    <>
      {person ? (
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {personName}
        </Link>
      ) : !personName || personName.trim() === '' ? (
        '-'
      ) : (
        personName
      )}
    </>
  );
};
