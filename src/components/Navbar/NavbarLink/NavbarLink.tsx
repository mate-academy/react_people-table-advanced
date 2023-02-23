import React from 'react';
import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

type Props = {
  to: string,
  preserveParams?: boolean,
  children?: React.ReactNode,
};

export const NavbarLink: React.FC<Props> = React.memo(({
  to,
  preserveParams = false,
  children,
}) => {
  const [searchParams] = useSearchParams();
  const search = preserveParams ? searchParams.toString() : '';

  return (
    <NavLink
      to={{
        pathname: to,
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
