import { useLocation } from 'react-router-dom';
import { NavigationLink } from '../NavigationLink';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink to="/" name="Home" />
          <NavigationLink
            to={`/people${location.search}`}
            name="People"
            aria-current="page"
          />
        </div>
      </div>
    </nav>
  );
};
