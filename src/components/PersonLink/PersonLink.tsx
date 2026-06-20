import React from 'react';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      replace
    >
      {person.name}
    </Link>
  );
};
