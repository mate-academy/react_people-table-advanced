import React from 'react';

import { Person } from '../../types';

import { Link, useLocation } from 'react-router-dom';

interface Props {
  person: Person;
  className?: string;
  children: React.ReactNode;
}

export const PersonLink: React.FC<Props> = ({
  person,
  className,
  children,
}) => {
  const { search } = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search }}
      className={className}
    >
      {children}
    </Link>
  );
};
