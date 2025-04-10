import React from 'react';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(pers => pers.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <SearchLink
      to={{ pathname: `/people/${person.slug}` }}
      params={{}}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </SearchLink>
  );
};
