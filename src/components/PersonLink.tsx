import React from 'react';
import cn from 'classnames';

import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}?${searchParams.toString()}`}
    >
      {person.name}
    </Link>
  );
};
