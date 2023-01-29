import React, { memo } from 'react';
import cn from 'classnames';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={{
        pathname: `${parentPath}${person.slug}`,
        search: location.search,
      }}
    >
      {person.name}
    </Link>
  );
});
