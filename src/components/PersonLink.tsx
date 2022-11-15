import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const parentPath = useResolvedPath('../').pathname;

  return (
    <NavLink
      to={parentPath + person.slug}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};
