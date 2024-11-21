import React from 'react';
import { Person } from '../types';

type PeopleLinkProps = {
  person: Person | null;
};

export const PersonLink: React.FC<PeopleLinkProps> = ({ person }) => {
  if (!person) {
    return <>-</>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
    >
      {person.name}
    </a>
  );
};
