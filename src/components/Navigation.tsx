import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';

export const Navigation: React.FC = () => {
  return (
    <nav className="App__nav">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? 'is-active' : '')}
      >
        <Button>Home</Button>
      </NavLink>

      <NavLink to="/table">
        <Button>People</Button>
      </NavLink>
    </nav>
  );
};
