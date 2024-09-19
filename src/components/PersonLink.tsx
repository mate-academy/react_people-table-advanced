import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person;
  children: React.ReactNode;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({
  person,
  children,
  className,
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
