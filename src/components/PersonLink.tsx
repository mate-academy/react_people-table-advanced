import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};
