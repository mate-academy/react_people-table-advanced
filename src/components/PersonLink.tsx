import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person | null;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <>{name}</>;
  }

  const search = searchParams.toString();
  const to = search
    ? `/people/${person.slug}?${search}`
    : `/people/${person.slug}`;

  return (
    <Link className={person.sex === 'f' ? 'has-text-danger' : ''} to={to}>
      {person.name}
    </Link>
  );
};
