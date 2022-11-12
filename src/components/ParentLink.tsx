import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent: Person;
};

export const ParentLink: React.FC<Props> = ({ parent }) => (
  <NavLink
    to={`/people/${parent.slug}`}
    className={() => classNames(
      'link',
      { 'has-text-danger': parent.sex === 'f' },
    )}
  >
    {parent.name}
  </NavLink>
);
