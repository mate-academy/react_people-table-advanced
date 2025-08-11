import React from 'react';
import { Person } from '../../../types';
import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const search = searchParams ? `?${searchParams}` : '';

  return (
    <NavLink
      to={`/people/${person.slug}${search}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};
