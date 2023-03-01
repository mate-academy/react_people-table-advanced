import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, slug, name } = person;

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
    >
      {name}
    </Link>
  );
};
