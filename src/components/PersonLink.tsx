import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: string | Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  if (!person) {
    return '-';
  }

  if (typeof person === 'string') {
    return person;
  }

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={{
        pathname: '../' + person.slug,
        search,
      }}
    >
      {person.name}
    </Link>
  );
};
