import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export const MainNavigation = () => (
  <Menu>
    <Menu.Item>
      <NavLink
        to="/"
        exact
        className="navbar-item"
      >
        Home Page
      </NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink
        to="/people"
        className="navbar-item"
      >
        People Page
      </NavLink>
    </Menu.Item>
  </Menu>
);
