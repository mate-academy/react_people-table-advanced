import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <NavLink
      to={slug}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </NavLink>
  );
};
