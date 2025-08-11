import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { search } = useLocation();

  const { name, slug, sex } = person;

  return (
    <NavLink
      to={{ pathname: `../${slug}`, search }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </NavLink>
  );
};
