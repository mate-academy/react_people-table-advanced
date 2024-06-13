import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  parent: Person;
}

export const PersonLink: React.FC<Props> = ({ parent }) => (
  <NavLink
    to={`/people/${parent.slug}`}
    className={classNames({
      'has-text-danger': parent.sex === 'f',
    })}
  >
    {parent.name}
  </NavLink>
);
