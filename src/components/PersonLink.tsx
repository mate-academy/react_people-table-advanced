import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';

interface PersonLinkProps {
  person?: Person | null;
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, name }) => {
  const { slug } = useParams();
  const { search } = useLocation();

  if (!person && !name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  const isActive = person.slug === slug;

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search }}
      className={cn({
        'has-text-danger': person.sex === 'f',
        'has-text-link': isActive,
      })}
      data-cy="person-link"
    >
      {name || person.name}
    </Link>
  );
};
