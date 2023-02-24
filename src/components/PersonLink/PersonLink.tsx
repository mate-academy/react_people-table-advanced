import cn from 'classnames';
import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      to={{
        pathname: parentPath + slug,
        search: location.search,
      }}
      className={cn({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
