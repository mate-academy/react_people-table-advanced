import React from 'react';
import { Person } from '../types';

interface PersonLinkProps {
  person?: Person;
}

const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  if (!person) {
    return <>-</>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </a>
  );
};

export default PersonLink;
