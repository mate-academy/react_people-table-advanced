import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person | null | undefined;
  fallback?: string;
};

export const PersonLink: React.FC<Props> = ({ person, fallback }) => {
  if (!person) {
    const normalizedFallback = fallback?.trim();

    return <>{normalizedFallback || '-'}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
