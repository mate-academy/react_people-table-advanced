import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  const searchParams = location.search;

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}${searchParams}`}
    >
      {person.name}
    </Link>
  );
};
