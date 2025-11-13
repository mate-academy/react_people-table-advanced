import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
  className?: string;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  className,
}) => {
  const [searchParams] = useSearchParams();

  const toPath = {
    pathname: `/people/${person.slug}`,
    search: searchParams.toString(),
  };

  return (
    <NavLink to={toPath} className={className}>
      {person.name}
    </NavLink>
  );
};
