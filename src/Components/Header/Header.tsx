import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = React.memo(() => {
  return (
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <NavLink
          className={({ isActive }) => (classNames(
            'nav-link',
            {
              active: isActive,
            },
          ))}
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink
          className={({ isActive }) => (classNames(
            'nav-link',
            {
              active: isActive,
            },
          ))}
          to="/people"
        >
          People
        </NavLink>
      </li>
    </ul>
  );
});
