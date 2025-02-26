import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | string;
};

export const PersonLink = ({ person }: Props) => {
  return typeof person !== 'string' && person?.slug ? (
    <Link
      to={`${person.slug}`}
      className={`${person.sex === 'f' && 'has-text-danger'}`}
    >
      {person.name}
    </Link>
  ) : (
    person || '-'
  );
};
