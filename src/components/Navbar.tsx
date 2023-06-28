import { NavButton } from './NavButton';

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
          <NavButton>Home</NavButton>
          <NavButton>People</NavButton>
        </div>
      </div>
    </nav>
  );
};
