import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const SearchLink: React.FC<Props> = ({ person }) => {
  const isWomenName = person.sex === 'f';
  const { search } = useLocation();

  return (
    <NavLink
      to={{ pathname: `/people/${person.slug}`, search }}
      className={classNames({
        'has-text-danger': isWomenName,
      })}
    >
      {person.name}
    </NavLink>
  );
};
