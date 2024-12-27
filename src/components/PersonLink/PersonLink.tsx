import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
