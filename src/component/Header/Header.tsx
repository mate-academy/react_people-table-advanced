import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header bg-dark">
      <div className="container">
        <ul className="header__navbar">
          <li>
            <NavLink
              to="/"
              className="header__navbar-link"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="people"
              className="header__navbar-link"
            >
              People
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
