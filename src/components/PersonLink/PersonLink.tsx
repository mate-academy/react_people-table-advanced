import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const location = useLocation();

  return (
    <NavLink
      to={{
        pathname: `/people/${slug}`,
        search: location.search,
      }}
      className={classnames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </NavLink>
  );
};
