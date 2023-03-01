import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    slug,
    sex,
    name,
  } = person;
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
