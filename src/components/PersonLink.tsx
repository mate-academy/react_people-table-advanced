import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      data-cy={`personLink-${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
