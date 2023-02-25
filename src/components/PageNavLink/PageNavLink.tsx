import React from 'react';
import { NavLink, To, useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  linkText: string;
  saveParams?: boolean;
};

type LinkState = {
  isActive: boolean;
};

type GetNavItemClassesFunc = (linkState: LinkState) => string;

export const PageNavLink: React.FC<Props> = ({
  to,
  linkText,
  saveParams = false,
}) => {
  const { search } = useLocation();

  const path: To | string = saveParams
    ? {
      pathname: to,
      search: search,
    }
    : to;

  const getClasses: GetNavItemClassesFunc = ({ isActive }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <NavLink
      to={path}
      className={getClasses}
    >
      {linkText}
    </NavLink>
  );
};
