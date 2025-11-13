import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person | undefined;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
