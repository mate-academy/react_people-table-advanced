import React, { FC } from 'react';
import { Link, useResolvedPath, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const parentPath = useResolvedPath('../').pathname;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: parentPath + person.slug,
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
