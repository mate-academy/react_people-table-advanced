import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to:string;
  text: string;
};

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': status.isActive },
);

export const NavigationLink:React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      aria-current="page"
      className={getActiveClasses}
      to={to}
    >
      {text}
    </NavLink>
  );
};
