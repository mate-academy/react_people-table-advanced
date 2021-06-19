import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { PersonNameType } from '../../HelpTools/types';

export const PersonName = ({ name, slug, sex }) => {
  const { url } = useRouteMatch();

  return (
    <NavLink
      to={`${url}/${slug}`}
      style={sex === 'm' ? { color: 'blue' } : { color: 'red' }}
      activeClassName="is-selected"
    >
      {name}
    </NavLink>
  );
};

PersonName.propTypes = PersonNameType;
