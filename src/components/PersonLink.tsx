import React from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

interface PersonLinkProps {
  people: Person[];
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ people, name }) => {
  const person = people.find(p => p.name === name);
  const location = useLocation();

  if (!name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
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
