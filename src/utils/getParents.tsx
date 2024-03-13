import React from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parents?: Person;
};

export function getParents(parentsName?: string | null) {
  if (parentsName) {
    return parentsName;
  }

  return '-';
}

export const ParentsLink: React.FC<Props> = ({ parents }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={{
        pathname: `${parents?.slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': parents?.sex === 'f' })}
    >
      {parents?.name}
    </NavLink>
  );
};
