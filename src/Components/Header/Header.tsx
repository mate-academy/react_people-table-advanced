import { NavLink } from 'react-router-dom';
import './Header.scss';

export const Header = () => (
  <header className="header">
    <h1 className="header__title">People table</h1>
    <nav className="nav">
      <NavLink
        to="/"
        className="nav__link"
      >
        Home Page
      </NavLink>
      <NavLink
        to="/people"
        className="nav__link"
      >
        People page
      </NavLink>
    </nav>
  </header>
);
