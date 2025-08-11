import React from 'react';
import cn from 'classnames';

import { Person } from '../types';
import { NavLink } from 'react-router-dom';

type Props = {
  person: Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <NavLink
    to={`/people/${person?.slug}`}
    className={cn({
      'has-text-danger': person?.sex === 'f',
    })}
  >
    {person?.name}
  </NavLink>
);
