import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};
