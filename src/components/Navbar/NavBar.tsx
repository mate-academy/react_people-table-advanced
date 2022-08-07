import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="is-flex is-justify-content-space-evenly">
      <NavLink to="/" className="navbar-item">
        Home
      </NavLink>
      <NavLink to="people" className="navbar-item">
        People
      </NavLink>
    </nav>
  );
};
