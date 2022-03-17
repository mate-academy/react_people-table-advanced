import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header: React.FC = () => (
  <nav className="Navigation">
    <Link to="/">Home</Link>
    <Link to="/people">People</Link>
  </nav>
);

export default Header;
