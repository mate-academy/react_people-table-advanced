import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent: Person,
};

export const ParentLink: React.FC<Props> = ({ parent }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${parent.slug}`,
        search: location.search,
      }}
      className={classNames(
        { 'has-text-danger': parent.sex === 'f' },
      )}
    >
      {parent.name}
    </Link>
  );
};
