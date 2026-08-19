import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

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
      className={({ isActive }) =>
        [
          person.sex === 'f' ? 'has-text-danger' : '',
          isActive ? 'is-active' : '',
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      {person.name}
    </NavLink>
  );
};
