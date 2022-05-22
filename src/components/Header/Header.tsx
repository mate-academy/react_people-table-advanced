import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => (
  <>
    <div className="LinksContainer">
      <NavLink
        className="Link"
        to="/home"
      >
        Home
      </NavLink>
      <NavLink
        className="Link"
        to="/people"
      >
        People
      </NavLink>
    </div>
  </>
);

export default Header;
