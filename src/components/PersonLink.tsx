import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  if (!person) {
    return <>-</>;
  }

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
