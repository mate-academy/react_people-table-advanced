import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = { person: Person | null; name?: string | null };

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const [searchParams] = useSearchParams();

  if (person) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({ 'has-text-danger': person?.sex === 'f' })}
      >
        {person?.name}
      </Link>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return null;
};
