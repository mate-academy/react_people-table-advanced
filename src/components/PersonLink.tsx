import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import React from 'react';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink = ({ person, className }: Props) => {
  const [searchParams] = useSearchParams();

  const search = searchParams.toString();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: search ? `?${search}` : '',
      }}
      className={className}
    >
      {person.name}
    </Link>
  );
};
