import { NavigationLink } from '../NavigationLink';

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink path="/" label="Home" />

          <NavigationLink path="/people" label="People" />
        </div>
      </div>
    </nav>
  );
};
