import { Person } from '../types';
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
