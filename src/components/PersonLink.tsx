import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      className={classNames({ 'has-text-danger': sex === 'f' })}
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
    >
      {name}
    </NavLink>
  );
};
