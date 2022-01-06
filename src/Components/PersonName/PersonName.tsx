import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { People } from '../../types/People';

import './PersonName.scss';

type Props = {
  person: People,
};

export const PersonName: React.FC<Props> = ({ person }) => {
  const searchParams = useLocation().search;

  return (
    <NavLink
      to={`${person.slug}${searchParams}`}
      className={person.sex === 'm' ? 'blue-link' : 'red-link'}
    >
      {person.name}
    </NavLink>
  );
};
