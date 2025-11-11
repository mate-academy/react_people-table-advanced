import React from 'react';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

interface PersonLinkProps {
  person?: Person | null;
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, name }) => {
  const location = useLocation();

  if (person) {
    return (
      <Link
        to={{ pathname: `/people/${person.slug}`, search: location.search }}
        className={cn({ 'has-text-danger': person.sex === 'f' })}
      >
        {name || person.name}
      </Link>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};
