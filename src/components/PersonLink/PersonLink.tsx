import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={slug}
      className={`${sex === 'f' && 'has-text-danger'}`}
    >
      {name}
    </Link>
  );
};
