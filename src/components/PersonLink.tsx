import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

  const FEMALE = 'f';

  return (
    <NavLink
      to={`../${slug}`}
      className={classNames({ 'has-text-danger': sex === FEMALE })}
    >
      {name}
    </NavLink>
  );
};
