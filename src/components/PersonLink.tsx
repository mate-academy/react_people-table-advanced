import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const classNameOfPL = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={classNameOfPL}
    >
      {person.name}
    </Link>
  );
};
