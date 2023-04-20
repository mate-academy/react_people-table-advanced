import React, { memo } from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const location = useLocation();
  const parenthPath = useResolvedPath('../').pathname;
  const { slug, name, sex } = person;

  return (
    <Link
      to={{
        pathname: parenthPath + slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
});
