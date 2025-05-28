import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

export const PersonLink: React.FC<{ person: Person | null }> = ({ person }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
