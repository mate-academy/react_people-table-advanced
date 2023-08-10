import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person?.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
