import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return (
    <Link
      className={person.sex !== 'm' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
