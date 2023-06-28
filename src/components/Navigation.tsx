import { NavButton } from './NavButton';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavButton>Home</NavButton>
        <NavButton>People</NavButton>
      </div>
    </div>
  </nav>
);
