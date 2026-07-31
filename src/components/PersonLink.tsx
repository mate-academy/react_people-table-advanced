import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person?.sex === 'f';
  const linkClass = isFemale ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={linkClass}>
      {person.name}
    </Link>
  );
};
