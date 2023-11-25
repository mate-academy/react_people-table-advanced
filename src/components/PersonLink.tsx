/* eslint-disable prefer-template */
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const slug = person.name.toLowerCase().replace(/ /g, '-')
   + '-' + person.born.toString();

  return (
    <Link
      to={`/people/${slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
