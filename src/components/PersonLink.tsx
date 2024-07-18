import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  onClick: (slug: string) => void;
}

export const PersonLink: React.FC<Props> = ({ person, onClick }) => {
  const location = useLocation();
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  const linkTo = {
    pathname: `/people/${person.slug}`,
    search: location.search,
  };

  return (
    <Link
      to={linkTo}
      className={className}
      onClick={() => onClick(person.slug)}
    >
      {person.name}
    </Link>
  );
};
