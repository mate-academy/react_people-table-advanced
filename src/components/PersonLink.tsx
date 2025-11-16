import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isWoman = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isWoman ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
