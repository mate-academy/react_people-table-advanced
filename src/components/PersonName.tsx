import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  person: Child,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <NavLink
      to={`/people/${person.slug}/${location.search}`}
      className={({ isActive }) => (
        isActive ? 'highlight Person__name' : 'Person__name')}
      style={{
        color: person.sex === 'm' ? 'blue' : 'red',
      }}
    >
      {person.name}
    </NavLink>
  );
};
