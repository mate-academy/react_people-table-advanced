import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string
  text: string
  end?: boolean
};
export const NavigationPage:FC<Props> = ({ to, text, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => (
      classNames('navbar-item', { 'has-background-grey-lighter': isActive })
    )}
  >
    {text}
  </NavLink>
);

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationPage to="/" text="Home" end />
          <NavigationPage to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
