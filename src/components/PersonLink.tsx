// src/components/PersonLink/PersonLink.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name?: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
