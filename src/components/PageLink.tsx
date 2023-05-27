import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  title: string;
};

export const PageLink: React.FC<Props> = ({ to, title }) => {
  const { search } = useLocation();

  return (
    <NavLink
      to={{
        pathname: to,
        search,
      }}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {title}
    </NavLink>
  );
};
