import React from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person | undefined
  children: string
};

export const PersonLink: React.FC<Props> = ({ person, children }) => {
  return (
    person
      ? (
        <Link
          to={`./${person.slug}`}
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
