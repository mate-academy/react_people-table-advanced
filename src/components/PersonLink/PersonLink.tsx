import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const parentPath = useResolvedPath('../').pathname;
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: parentPath + person.slug,
        search: location.search,
      }}
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </NavLink>
  );
};
