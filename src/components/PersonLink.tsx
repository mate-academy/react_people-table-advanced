import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <NavLink
      to={`/people/${person.slug}${location.search}`}
      className={person.sex === 'm' ? '' : 'has-text-danger'}
    >
      {person.name}
    </NavLink>
  );
};
