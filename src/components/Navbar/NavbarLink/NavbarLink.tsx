import React from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  pathname: string,
  preserveParams?: boolean,
  children?: React.ReactNode,
};

export const NavbarLink: React.FC<Props> = React.memo(({
  pathname,
  preserveParams = false,
  children,
}) => {
  const location = useLocation();
  const search = preserveParams ? location.search : '';

  return (
    <NavLink
      to={{
        pathname,
        search,
      }}
      className={({ isActive }) => (
        classNames(
          'navbar-item',
          { 'has-background-grey-lighter': isActive },
        )
      )}
    >
      {children}
    </NavLink>
  );
});
