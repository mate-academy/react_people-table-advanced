import classNames from 'classnames';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={`/people/${person.slug}?${searchParams.toString()}`}
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </NavLink>
  );
};
