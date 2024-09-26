import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

const GENDER_FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const to = `../people/${slug}`;
  const className = sex === GENDER_FEMALE ? 'has-text-danger' : '';

  return (
    <Link to={to} className={className}>
      {name}
    </Link>
  );
};
