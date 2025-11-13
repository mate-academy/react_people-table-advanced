import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  searchParams: URLSearchParams;
}

export const PersonLink: React.FC<Props> = ({ person, searchParams }) => {
  const isWoman = person.sex === 'f';
  const className = isWoman ? 'has-text-danger' : '';
  const personLink = `/people/${person.slug}?${searchParams.toString()}`;

  return (
    <Link to={personLink} className={className}>
      {person.name}
    </Link>
  );
};
