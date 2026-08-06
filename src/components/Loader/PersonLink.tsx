import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
