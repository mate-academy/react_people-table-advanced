import { PageNavBar } from '../PageNavBar';

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
          <PageNavBar to="/" text="Home" />
          <PageNavBar to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
