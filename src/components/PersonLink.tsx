import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person | null;
  name: string;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: location.search }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
