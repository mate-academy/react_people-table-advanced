import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  handlerClickOnPeopleTable: () => void,
};

export const Navbar:FC<Props> = ({ handlerClickOnPeopleTable }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'navbar-item',
              { 'has-background-grey-lighter': isActive },
            )}
            to="people"
            onClick={handlerClickOnPeopleTable}
            aria-current="page"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
