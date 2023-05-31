import { NewNavLink } from './NewNavLink';

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
          <NewNavLink title="Home" path="/" />

          <NewNavLink
            title="People"
            path="/people"
            testRequired
          />
        </div>
      </div>
    </nav>
  );
};
