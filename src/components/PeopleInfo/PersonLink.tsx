import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
  } = person;

  return (
    <NavLink
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </NavLink>
  );
};
