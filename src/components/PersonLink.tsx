import { Person } from '../types';
import { NavLink } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
