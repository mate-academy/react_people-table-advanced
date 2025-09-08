import React from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
