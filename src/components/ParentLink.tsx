import classNames from 'classnames';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent: Person;
};

export const ParentLink: React.FC<Props> = ({ parent }) => {
  const [searchParams] = useSearchParams();

  return (
    <NavLink
      to={`/people/${parent.slug}?${searchParams}`}
      className={() => classNames(
        'link',
        { 'has-text-danger': parent.sex === 'f' },
      )}
    >
      {parent.name}
    </NavLink>
  );
};
