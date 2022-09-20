import { PageNavLink } from '../PageNavLink';

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink
            to="/"
            title="Home"
          />

          <PageNavLink
            to="/people"
            title="People"
          />
        </div>
      </div>
    </nav>
  );
};
