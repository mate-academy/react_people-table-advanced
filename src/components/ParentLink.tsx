import React from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent: Person;
};

export const ParentLink: React.FC<Props> = ({ parent }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={{
        pathname: `${parent.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': parent.sex === 'f' })}
    >
      {parent.name}
    </NavLink>
  );
};
