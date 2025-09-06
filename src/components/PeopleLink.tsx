import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PeopleLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
