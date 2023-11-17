import cn from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};
