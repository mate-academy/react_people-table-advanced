import React from 'react';
import './Header.scss';

import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <div className="navigation">
      <Link
        className="navigation__home"
        to="/"
        style={{ textDecoration: 'none' }}
      >
        <div className="navigation__home--link">
          <p>
            HO
            <br />
            ME
          </p>
        </div>
      </Link>

      <NavLink
        className="navigation__link"
        to="/home"
      >
        Home
      </NavLink>

      <NavLink
        className="navigation__link"
        to="/people"
      >
        People
      </NavLink>
    </div>
  );
};
