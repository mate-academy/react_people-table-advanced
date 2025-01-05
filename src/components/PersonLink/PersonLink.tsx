import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
