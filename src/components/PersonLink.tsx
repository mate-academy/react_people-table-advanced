import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person?: Person;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : undefined}
      to={`/people/${person.slug}`}
    >
      {name}
    </Link>
  );
};
