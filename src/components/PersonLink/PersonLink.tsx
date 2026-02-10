import React from 'react';
import { Person } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
