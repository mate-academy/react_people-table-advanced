import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { classChange } from '../utils/classChange';
import { PeopleContext } from '../PeopleContext';

export const Navbar = () => {
  const { setIsPageActive } = useContext(PeopleContext);

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
            className={classChange}
            to="/"
            onClick={() => setIsPageActive(false)}
          >
            Home
          </NavLink>

          <NavLink
            className={classChange}
            to="/people"
            onClick={() => setIsPageActive(true)}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
