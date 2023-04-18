import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types/Person';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const resolvedPath = useResolvedPath('../').pathname;
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: resolvedPath + slug,
        search: location.search,
      }}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
});
