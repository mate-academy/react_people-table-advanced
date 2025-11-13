import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, className }) => {
  const location = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: location.search }}
      className={className}
    >
      {person.name}
    </Link>
  );
};
