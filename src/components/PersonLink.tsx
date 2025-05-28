import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export type PersonLinkProps = {
  person: string | null;
  allPeople: Person[];
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  allPeople,
}) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <span>-</span>;
  }

  const foundPerson = allPeople.find(p => p.name === person);

  if (!foundPerson) {
    return <span>{person}</span>;
  }

  const isFemale = foundPerson.sex === 'f';
  const className = isFemale ? 'has-text-danger' : '';

  const searchString = searchParams.toString();
  const linkTo = `/people/${foundPerson.slug}${searchString ? `?${searchString}` : ''}`;

  return (
    <Link className={className} to={linkTo}>
      {person}
    </Link>
  );
};
