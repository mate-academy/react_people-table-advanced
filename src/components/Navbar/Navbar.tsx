import { Navlink } from '../Navlink';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <Navlink to="/" text="Home" />
        <Navlink to="/people" text="People" />
      </div>
    </div>
  </nav>
);
