import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  children: React.ReactNode;
};

const GENDER_FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person, children }) => {
  const { slug } = person;
  const to = `../people/${slug}`;
  const className = person.sex === GENDER_FEMALE ? 'has-text-danger' : '';

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};
