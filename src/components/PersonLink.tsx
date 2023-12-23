import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person | undefined
  children: string
};

export const PersonLink: React.FC<Props> = ({ person, children }) => {
  const [searchParams] = useSearchParams();

  return (
    person
      ? (
        <Link
          to={{
            pathname: `./${person.slug}`,
            search: searchParams.toString(),
          }}
          className={cn(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {children}
        </Link>
      )
      : (
        <p>
          {children}
        </p>
      )
  );
};
