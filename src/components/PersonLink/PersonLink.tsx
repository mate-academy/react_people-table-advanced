import React from 'react';
import { Person } from '../../types';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person?: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={`../people/${person?.slug}?${searchParams.toString()}`}
      state={{ search: searchParams.toString() }}
      className={classNames({ 'has-text-danger': person?.sex === 'f' })}
    >
      {person?.name}
    </NavLink>
  );
};
