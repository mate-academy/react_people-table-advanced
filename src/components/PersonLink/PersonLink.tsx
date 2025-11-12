import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: location.search }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
