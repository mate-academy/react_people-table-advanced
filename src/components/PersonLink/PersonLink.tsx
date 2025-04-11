import { Link } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

type PersonLinkProps = {
  person: Person | undefined;
  isWoman: boolean;
  name: string;
};

export const PersonLink = ({ person, isWoman, name }: PersonLinkProps) => {
  const classLink = isWoman ? `has-text-danger` : '';

  if (!person) {
    return <p>{name}</p>;
  }

  return (
    <Link className={classLink} to={`/people/${person.slug}`}>
      {name}
    </Link>
  );
};
